import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
  type Node,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Search, RotateCcw, Sparkles, FolderArchive, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import { ProjectNode, type ProjectNodeData } from "./project-node";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const nodeTypes: NodeTypes = { project: ProjectNode };

/** Layout generator clustering projects by domain columns with support for practice archive toggle */
function buildLayout(includeArchive: boolean): {
  nodes: Node<ProjectNodeData>[];
  edges: Edge[];
  visibleProjects: Project[];
} {
  const visibleProjects = includeArchive
    ? projects
    : projects.filter((p) => p.isMain !== false);

  // Column assignment based on domain
  const getColX = (p: Project): number => {
    if (includeArchive) {
      if (p.category === "data") return 0;
      if (p.category === "ai-ml") return 400;
      if (p.category === "mcp" || p.category === "web") return 800;
      return 1200; // research / labs
    }
    // Main showcase mode: 3 balanced columns
    if (p.category === "data") return 0;
    if (p.category === "ai-ml") return 400;
    return 800; // mcp and web
  };

  const rowH = 340;
  const perColCount: Record<number, number> = {};

  const nodes: Node<ProjectNodeData>[] = visibleProjects.map((p) => {
    const colX = getColX(p);
    const rowIdx = perColCount[colX] ?? 0;
    perColCount[colX] = rowIdx + 1;

    return {
      id: p.slug,
      type: "project",
      position: { x: colX, y: rowIdx * rowH },
      data: {
        project: p,
        onOpen: () => {},
      },
      draggable: true,
    };
  });

  const edges: Edge[] = [];
  const seen = new Set<string>();
  const addEdge = (a: string, b: string, kind: "domain" | "tech") => {
    const key = [a, b].sort().join("→");
    if (seen.has(key) || a === b) return;
    seen.add(key);
    edges.push({
      id: `${key}-${kind}`,
      source: a,
      target: b,
      type: "smoothstep",
      animated: false,
      style: {
        stroke: kind === "domain" ? "hsl(var(--primary))" : "hsl(var(--border))",
        strokeWidth: 1.25,
        strokeDasharray: kind === "tech" ? "4 4" : undefined,
        opacity: 0.6,
      },
    });
  };

  // Same-domain connections within each column
  const groupedByCol: Record<number, Project[]> = {};
  visibleProjects.forEach((p) => {
    const col = getColX(p);
    if (!groupedByCol[col]) groupedByCol[col] = [];
    groupedByCol[col].push(p);
  });

  Object.values(groupedByCol).forEach((colProjects) => {
    for (let i = 0; i < colProjects.length - 1; i++) {
      addEdge(colProjects[i].slug, colProjects[i + 1].slug, "domain");
    }
  });

  // Cross-cluster connections via shared core technologies
  const anchorTechs = ["Power BI", "Python", "SQL", "Deep Learning", "React", "DAX"];
  anchorTechs.forEach((tech) => {
    const owners = visibleProjects.filter((p) =>
      [...(p.tags ?? []), ...(p.technologies ?? [])].some((t) =>
        t.toLowerCase().includes(tech.toLowerCase()),
      ),
    );
    for (let i = 0; i < owners.length; i++) {
      for (let j = i + 1; j < owners.length; j++) {
        if (getColX(owners[i]) !== getColX(owners[j])) {
          addEdge(owners[i].slug, owners[j].slug, "tech");
          break; // Keep cross-links clean & readable
        }
      }
    }
  });

  return { nodes, edges, visibleProjects };
}

function relatedIds(project: Project, pool: Project[]): Set<string> {
  const techs = new Set(
    [...(project.tags ?? []), ...(project.technologies ?? [])].map((t) =>
      t.toLowerCase(),
    ),
  );
  const ids = new Set<string>([project.slug]);
  pool.forEach((p) => {
    if (p.slug === project.slug) return;
    if (p.category === project.category) {
      ids.add(p.slug);
      return;
    }
    const overlap = [...(p.tags ?? []), ...(p.technologies ?? [])].some((t) =>
      techs.has(t.toLowerCase()),
    );
    if (overlap) ids.add(p.slug);
  });
  return ids;
}

type Filter =
  | "all"
  | "data"
  | "ai-ml"
  | "mcp"
  | "web"
  | "practice"
  | "power-bi"
  | "python"
  | "sql";

const filterOptions: { id: Filter; label: string; badge?: string }[] = [
  { id: "data", label: "Data Analytics (BI)", badge: "Primary" },
  { id: "ai-ml", label: "ML & Deep Learning" },
  { id: "mcp", label: "Agentic MCP" },
  { id: "web", label: "Web Applications" },
  { id: "all", label: "All Projects" },
  { id: "power-bi", label: "Power BI" },
  { id: "python", label: "Python" },
  { id: "sql", label: "SQL" },
];

function matchesFilter(p: Project, f: Filter): boolean {
  if (f === "all") return true;
  if (f === "data" || f === "ai-ml" || f === "mcp" || f === "web") {
    return p.category === f;
  }
  if (f === "practice") {
    return p.tier === "practice" || p.tier === "competition" || p.tier === "hackathon";
  }
  const bag = [...(p.tags ?? []), ...(p.technologies ?? [])]
    .join(" ")
    .toLowerCase();
  if (f === "power-bi") return bag.includes("power bi");
  if (f === "python") return bag.includes("python");
  if (f === "sql") return bag.includes("sql");
  return true;
}

function WorkspaceInner() {
  const navigate = useNavigate();
  const [showArchive, setShowArchive] = useState(false);
  const { fitView } = useReactFlow();

  const layout = useMemo(() => buildLayout(showArchive), [showArchive]);
  const [nodes, setNodes, onNodesChange] = useNodesState(layout.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layout.edges);

  const [query, setQuery] = useState("");
  // Default filter to "data" (Data Analytics & BI) so the primary analytics projects are highlighted first
  const [filter, setFilter] = useState<Filter>("data");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [opening, setOpening] = useState<string | null>(null);
  const openingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync nodes and edges whenever showArchive toggle flips
  useEffect(() => {
    const fresh = buildLayout(showArchive);
    setNodes(
      fresh.nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          onOpen: handleOpen,
        },
      })),
    );
    setEdges(fresh.edges);
    const timer = setTimeout(() => {
      fitView({ padding: 0.12, minZoom: 0.35, maxZoom: 1.15, duration: 450 });
    }, 40);
    return () => clearTimeout(timer);
  }, [showArchive]);

  const handleOpen = useCallback(
    (slug: string) => {
      if (opening) return;
      trackEvent("workspace_node_click", { slug });
      setOpening(slug);
      openingTimer.current = setTimeout(() => {
        navigate({ to: "/projects/$slug", params: { slug } });
      }, 950);
    },
    [navigate, opening],
  );

  useEffect(() => {
    if (!query) return;
    const t = setTimeout(() => {
      trackEvent("workspace_search", { query });
    }, 700);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => () => {
    if (openingTimer.current) clearTimeout(openingTimer.current);
  }, []);

  const q = query.trim().toLowerCase();
  const hovered = useMemo(() => {
    if (!hoverId) return null;
    const target = layout.visibleProjects.find((p) => p.slug === hoverId);
    return target ? relatedIds(target, layout.visibleProjects) : null;
  }, [hoverId, layout.visibleProjects]);

  const activeIds = useMemo(() => {
    const ids = new Set<string>();
    layout.visibleProjects.forEach((p) => {
      const passesFilter = matchesFilter(p, filter);
      const passesQuery =
        !q ||
        [
          p.title,
          p.summary,
          ...(p.tags ?? []),
          ...(p.technologies ?? []),
          p.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      if (passesFilter && passesQuery) ids.add(p.slug);
    });
    return ids;
  }, [filter, q, layout.visibleProjects]);

  // Update visual state (dimmed / highlighted / edges)
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        const inActive = activeIds.has(n.id);
        const inHover = hovered ? hovered.has(n.id) : true;
        const dimmed = !inActive || !inHover;
        const highlighted =
          (!!q && inActive) || (!!hoverId && hovered?.has(n.id) === true);
        return {
          ...n,
          data: {
            ...(n.data as ProjectNodeData),
            onOpen: handleOpen,
            dimmed,
            highlighted,
          },
        };
      }),
    );
    setEdges((eds) =>
      eds.map((e) => {
        const active =
          activeIds.has(e.source) &&
          activeIds.has(e.target) &&
          (!hovered || (hovered.has(e.source) && hovered.has(e.target)));
        return {
          ...e,
          style: { ...e.style, opacity: active ? 0.75 : 0.08 },
          animated: !!hoverId && active,
        };
      }),
    );
  }, [activeIds, hovered, hoverId, q, handleOpen, setNodes, setEdges]);

  const reset = useCallback(() => {
    const fresh = buildLayout(showArchive);
    setNodes(
      fresh.nodes.map((n) => ({
        ...n,
        data: { ...(n.data as ProjectNodeData), onOpen: handleOpen },
      })),
    );
    setEdges(fresh.edges);
    setQuery("");
    setFilter("data");
    setHoverId(null);
    setTimeout(() => fitView({ padding: 0.12, minZoom: 0.35, maxZoom: 1.15, duration: 400 }), 30);
  }, [setNodes, setEdges, handleOpen, fitView, showArchive]);

  return (
    <div className="relative">
      {/* Top Bar with Archive Toggle & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-border border-b-0 bg-card px-4 py-3">
        {/* View Mode Segmented Switch (Curated 11 vs Include Practice 16) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mr-1 hidden sm:inline">
            Canvas View:
          </span>
          <div className="inline-flex rounded-md border border-border bg-background p-1 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setShowArchive(false);
                trackEvent("workspace_toggle_archive", { enabled: false });
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-all",
                !showArchive
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="h-3 w-3" />
              Recruiter Showcase (11 Main)
            </button>
            <button
              type="button"
              onClick={() => {
                setShowArchive(true);
                trackEvent("workspace_toggle_archive", { enabled: true });
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-all",
                showArchive
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FolderArchive className="h-3 w-3" />
              Include Practice & Labs (16 Total)
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, stack, metrics…"
            className="w-48 sm:w-60 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Discipline Filters Bar */}
      <div className="flex flex-wrap items-center gap-2 border border-border border-b-0 bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-1">
          <Layers className="h-3 w-3" />
          Filter:
        </div>

        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                trackEvent("workspace_filter", { filter: f.id });
              }}
              className={cn(
                "inline-flex items-center gap-1 rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/40",
              )}
            >
              {f.label}
              {f.badge && filter === f.id ? (
                <span className="rounded bg-primary-foreground/20 px-1 text-[8.5px] font-sans lowercase">
                  {f.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            trackEvent("workspace_reset");
            reset();
          }}
          className="ml-auto inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3" /> Reset View
        </button>
      </div>

      {/* Canvas Status & Legend */}
      <div className="flex flex-wrap items-center gap-4 border border-border border-b-0 bg-muted/50 px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="font-semibold text-foreground">
          Model View · {layout.visibleProjects.length} Tables{" "}
          <span className="font-normal text-muted-foreground">
            ({showArchive ? "All 16 Projects Active" : "11 Recruiter-Curated"})
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-5 bg-primary" /> Shared Domain
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-px w-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--muted-foreground)) 50%, transparent 50%)",
              backgroundSize: "6px 1px",
            }}
          />
          Shared Technology
        </span>
        <span className="ml-auto hidden md:inline text-right text-[10px] text-muted-foreground">
          Drag cards · Pan & zoom · Click table to inspect case study
        </span>
      </div>

      {/* Interactive Flow Canvas */}
      <div
        className="relative h-[820px] w-full border border-border bg-background"
        onMouseLeave={() => setHoverId(null)}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={(_, n) => {
            setHoverId(n.id);
            trackEvent("workspace_node_hover", { slug: n.id });
          }}
          onNodeMouseLeave={() => setHoverId(null)}
          onNodeDragStart={(_, n) =>
            trackEvent("workspace_node_drag_start", { slug: n.id })
          }
          onNodeDragStop={(_, n) =>
            trackEvent("workspace_node_drag_stop", {
              slug: n.id,
              x: Math.round(n.position.x),
              y: Math.round(n.position.y),
            })
          }
          fitView
          fitViewOptions={{ padding: 0.12, minZoom: 0.35, maxZoom: 1.15 }}
          minZoom={0.25}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          nodesConnectable={false}
          edgesFocusable={false}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={22}
            size={1}
            color="hsl(var(--border))"
          />
          <Controls
            showInteractive={false}
            className="!border !border-border !bg-card"
          />
          <MiniMap
            pannable
            zoomable
            className="!border !border-border !bg-card"
            nodeColor={() => "hsl(var(--primary))"}
            maskColor="hsl(var(--background) / 0.7)"
          />
        </ReactFlow>

        {/* Transition Overlay */}
        <AnimatePresence>
          {opening ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-background/85 backdrop-blur-sm"
            >
              <div className="w-[320px] rounded-sm border border-border bg-card p-4 font-mono text-[11px] shadow-card">
                <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Opening Case Study
                </div>
                {["Loading dimensional schema…", "Evaluating DAX measures…", "Fetching case insights…", "Opening project…"].map(
                  (line, i) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.18 }}
                      className="flex items-center gap-2 py-0.5 text-foreground/90"
                    >
                      <span className="text-primary">›</span>
                      {line}
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ProjectsWorkspace() {
  return (
    <ReactFlowProvider>
      <WorkspaceInner />
    </ReactFlowProvider>
  );
}

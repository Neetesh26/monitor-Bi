import { useEffect, useRef } from "react";
import * as d3 from "d3";

const allData = [
  { date: "13 Mar 1", label: "13 Mar", productive: 40, neutral: 10, idle: 0 },
  { date: "13 Mar 2", label: "13 Mar", productive: 42, neutral: 8,  idle: 0 },
  { date: "13 Mar 3", label: "13 Mar", productive: 38, neutral: 12, idle: 0 },
  { date: "14 Mar",   label: "14 Mar", productive: 45, neutral: 5,  idle: 0 },
  { date: "15 Mar",   label: "15 Mar", productive: 41, neutral: 9,  idle: 0 },
  { date: "16 Mar",   label: "16 Mar", productive: 39, neutral: 11, idle: 0 },
];

const colors = {
  productive: "#9db4c0",
  neutral:    "#e6cf7a",
  idle:       "#f3a6c6",
};
const keys = ["productive", "neutral", "idle"];

export default function D3ActivityChart({ data = allData }) {
  const svgRef    = useRef(null);
  const ttRef     = useRef(null);
  const lineRef   = useRef(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const W      = svgEl.clientWidth  || 700;
    const H      = svgEl.clientHeight || 400;
    const margin = { top: 20, right: 20, bottom: 36, left: 52 };

    d3.select(svgEl).selectAll("*").remove();
    const svg = d3.select(svgEl).attr("viewBox", `0 0 ${W} ${H}`);

    const x = d3.scaleBand()
      .domain(data.map((d) => d.date))
      .range([margin.left, W - margin.right])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, 180])
      .range([H - margin.bottom, margin.top]);

    const stack       = d3.stack().keys(keys);
    const stackedData = stack(data);

    // Grid lines
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(y)
          .tickSize(-(W - margin.left - margin.right))
          .tickFormat("")
          .ticks(6)
      )
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll("line").attr("stroke", "rgba(0,0,0,0.06)");
      });

    // Bars
    const barGroups = svg.append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => colors[d.key]);

    const bars = barGroups.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x",      (d) => x(d.data.date))
      .attr("y",      y(0))
      .attr("height", 0)
      .attr("width",  x.bandwidth())
      .attr("rx",     3);

    // Animate bars on mount
    bars.transition()
      .duration(700)
      .delay((_, i) => i * 80)
      .ease(d3.easeCubicOut)
      .attr("y",      (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]));

    // Hover on bars
    const tooltip  = d3.select(ttRef.current);
    const hoverLine = d3.select(lineRef.current);

    bars
      .on("mouseover", function (_, d) {
        d3.select(this).transition().duration(150).attr("opacity", 0.72);
        const row    = d.data;
        const fmt    = (v) => (v >= 60 ? `${Math.floor(v / 60)}h ${v % 60}m` : `${v}m`);
        const xPos   = x(row.date) + x.bandwidth() / 2;
        const yPos   = y(d[1]);

        hoverLine
          .attr("x1", xPos).attr("x2", xPos)
          .attr("y1", margin.top).attr("y2", H - margin.bottom)
          .transition().duration(120).style("opacity", 1);

        tooltip
          .style("opacity", 1)
          .style("left",  `${xPos + x.bandwidth() / 2 + 8}px`)
          .style("top",   `${yPos}px`)
          .html(
            `<b>${row.label}</b><br/>` +
            `<span style="color:#9db4c0">● Productive: ${fmt(row.productive)}</span><br/>` +
            `<span style="color:#c8a800">● Neutral: ${fmt(row.neutral)}</span><br/>` +
            `<span style="color:#f3a6c6">● Idle: ${fmt(row.idle)}</span>`
          );
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(150).attr("opacity", 1);
        hoverLine.transition().duration(120).style("opacity", 0);
        tooltip.style("opacity", 0);
      });

    // Y Axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(y)
          .ticks(6)
          .tickFormat((v) => {
            if (v === 0)   return "0";
            if (v === 60)  return "1 hr";
            if (v === 120) return "2 hr";
            if (v === 180) return "3 hr";
            return `${v}m`;
          })
      )
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll("text").attr("fill", "#94a3b8").style("font-size", "11px");
        g.selectAll("line").remove();
      });

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0,${H - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((_, i) => data[i].label))
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll("text").attr("fill", "#94a3b8").style("font-size", "11px");
        g.selectAll("line").remove();
      });

  }, [data]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Tooltip */}
      <div
        ref={ttRef}
        style={{
          position:     "absolute",
          background:   "#fff",
          border:       "1px solid #e2e8f0",
          borderRadius: 10,
          padding:      "10px 14px",
          fontSize:     12,
          pointerEvents:"none",
          opacity:      0,
          transition:   "opacity .15s",
          zIndex:       10,
          whiteSpace:   "nowrap",
          boxShadow:    "0 4px 16px rgba(0,0,0,0.08)",
        }}
      />
      {/* Hover line lives inside svg via ref */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        <line
          ref={lineRef}
          stroke="#999"
          strokeDasharray="4 4"
          style={{ opacity: 0, transition: "opacity .12s" }}
        />
      </svg>
    </div>
  );
} 
// Trading Psychology Library — App Component
// Data is loaded from data.js as window globals

const { useState } = React;
const { BOOKS, GAP_BRIDGES, SYNTHESIS, COLORS } = window;

function TradingPsychologyLibrary() {
  const [activeBook, setActiveBook] = useState("dt");
  const [activeSection, setActiveSection] = useState(null);
  const [view, setView] = useState("book");
  const [activeGap, setActiveGap] = useState(null);
  const book = BOOKS[activeBook];

  const Block = ({ label, color, children }) => {
    const styles = {
      gold: { bg: "#141210", bd: "#2A2010", left: "#C8A96E", text: "#D4C4A0" },
      blue: { bg: "#0F1218", bd: "#1A2430", left: "#6E9EC8", text: "#B0C4D8" },
      green: { bg: "#0F1410", bd: "#1A2A1A", left: "#7EC8A0", text: "#B0CEB8" },
      purple: { bg: "#140F18", bd: "#2A1A30", left: "#C87EC8", text: "#D4B0D8" },
      neutral: { bg: "#141418", bd: "#2A2A2E", left: "#555", text: "#AAA" }
    };
    const s = styles[color] || styles.neutral;
    return (
      <div style={{ padding: "16px 20px", background: s.bg, border: `1px solid ${s.bd}`, borderLeft: `3px solid ${s.left}`, borderRadius: "3px", marginBottom: "12px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", color: s.left, marginBottom: "7px", fontFamily: "monospace" }}>{label}</div>
        <div style={{ fontSize: "15px", color: s.text, lineHeight: 1.9, whiteSpace: "pre-line" }}>{children}</div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0D", color: "#E0DDD6", fontFamily: "'Georgia', serif" }}>
      <div style={{ padding: "22px 30px 16px", borderBottom: "1px solid #1A1A1E", background: "#0D0D10" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#555", marginBottom: "7px", fontFamily: "monospace" }}>TRADING PSYCHOLOGY · MASTER LIBRARY · FUTURES EDITION</div>
        <h1 style={{ margin: 0, fontSize: "21px", fontWeight: "400" }}>The Trader's Mind — Four Book Synthesis</h1>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #1A1A1E", background: "#0D0D10", overflowX: "auto" }}>
        {Object.values(BOOKS).map(b => (
          <button key={b.id} onClick={() => { setActiveBook(b.id); setActiveSection(null); setView("book"); }}
            style={{ flexShrink: 0, padding: "13px 17px", background: activeBook === b.id && view === "book" ? "#13131A" : "transparent", border: "none", borderBottom: activeBook === b.id && view === "book" ? `2px solid ${b.color}` : "2px solid transparent", cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: b.color, marginBottom: "3px", fontFamily: "monospace" }}>{b.tag}</div>
            <div style={{ fontSize: "14px", color: activeBook === b.id && view === "book" ? "#E0DDD6" : "#777" }}>{b.title}</div>
            <div style={{ fontSize: "12px", color: "#555" }}>{b.author}</div>
          </button>
        ))}
        <button onClick={() => setView("gaps")}
          style={{ flexShrink: 0, padding: "13px 17px", background: view === "gaps" ? "#13131A" : "transparent", border: "none", borderBottom: view === "gaps" ? "2px solid #E88060" : "2px solid transparent", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#E88060", marginBottom: "3px", fontFamily: "monospace" }}>REPAIR</div>
          <div style={{ fontSize: "14px", color: view === "gaps" ? "#E0DDD6" : "#777" }}>Gap Bridge</div>
          <div style={{ fontSize: "12px", color: "#555" }}>Douglas + Faith → Tendler</div>
        </button>
        <button onClick={() => setView("synthesis")}
          style={{ flexShrink: 0, padding: "13px 17px", background: view === "synthesis" ? "#13131A" : "transparent", border: "none", borderBottom: view === "synthesis" ? "2px solid #9B7EC8" : "2px solid transparent", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#9B7EC8", marginBottom: "3px", fontFamily: "monospace" }}>CROSS-BOOK</div>
          <div style={{ fontSize: "14px", color: view === "synthesis" ? "#E0DDD6" : "#777" }}>Synthesis</div>
          <div style={{ fontSize: "12px", color: "#555" }}>5 unified themes</div>
        </button>
      </div>

      {view === "gaps" && (
        <div style={{ padding: "26px 30px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#E88060", marginBottom: "7px", fontFamily: "monospace" }}>WHAT DOUGLAS + FAITH IDENTIFIED BUT DIDN'T SOLVE</div>
          <h2 style={{ margin: "0 0 5px", fontSize: "21px", fontWeight: "400" }}>The Gap Bridge</h2>
          <p style={{ color: "#666", fontSize: "15px", margin: "0 0 22px", lineHeight: 1.7 }}>Douglas and Faith diagnose the problems with precision. Tendler provides the repair mechanics. This section maps every major unresolved gap to its specific Tendler solution — with actionable protocols for each.</p>
          {GAP_BRIDGES.map((gb, i) => (
            <div key={gb.id} style={{ marginBottom: "10px", background: "#0F0F14", border: `1px solid ${activeGap === gb.id ? "#E88060" : "#1E1E28"}`, borderRadius: "4px", overflow: "hidden", transition: "border-color 0.15s" }}>
              <button onClick={() => setActiveGap(activeGap === gb.id ? null : gb.id)}
                style={{ width: "100%", padding: "14px 18px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: "10px", color: "#E88060", fontFamily: "monospace", marginBottom: "2px" }}>GAP {String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontSize: "18px", color: activeGap === gb.id ? "#E88060" : "#444" }}>{activeGap === gb.id ? "▾" : "▸"}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", color: "#D0CCC4", lineHeight: 1.5 }}>{gb.gap}</div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "7px", flexWrap: "wrap" }}>
                    {gb.books.map(b => (
                      <span key={b} style={{ fontSize: "11px", padding: "2px 7px", background: "#1A1A20", border: "1px solid #2A2A30", borderRadius: "2px", color: "#888", fontFamily: "monospace" }}>{b}</span>
                    ))}
                    <span style={{ fontSize: "11px", padding: "2px 7px", background: "#1A1028", border: "1px solid #2A1A38", borderRadius: "2px", color: "#C87EC8", fontFamily: "monospace" }}>→ {gb.tendlerConcept}</span>
                  </div>
                </div>
              </button>
              {activeGap === gb.id && (
                <div style={{ padding: "0 18px 18px" }}>
                  <div style={{ padding: "13px 16px", background: "#141210", borderLeft: "3px solid #C8A96E", borderRadius: "3px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#C8A96E", marginBottom: "5px", fontFamily: "monospace" }}>WHAT DOUGLAS / FAITH SAID</div>
                    <div style={{ fontSize: "14px", color: "#D4C4A0", fontStyle: "italic", lineHeight: 1.7 }}>"{gb.douglasQuote}"</div>
                  </div>
                  <div style={{ padding: "13px 16px", background: "#141018", borderLeft: "3px solid #E88060", borderRadius: "3px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#E88060", marginBottom: "5px", fontFamily: "monospace" }}>THE GAP — WHAT'S MISSING</div>
                    <div style={{ fontSize: "15px", color: "#D4B8A8", lineHeight: 1.8 }}>{gb.douglasGap}</div>
                  </div>
                  <div style={{ padding: "13px 16px", background: "#140F18", borderLeft: "3px solid #C87EC8", borderRadius: "3px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#C87EC8", marginBottom: "5px", fontFamily: "monospace" }}>TENDLER'S BRIDGE — THE REPAIR MECHANIC</div>
                    <div style={{ fontSize: "15px", color: "#D4B0D8", lineHeight: 1.8, whiteSpace: "pre-line" }}>{gb.tendlerBridge}</div>
                  </div>
                  <div style={{ padding: "13px 16px", background: "#0A100A", borderLeft: "3px solid #7EC8A0", borderRadius: "3px" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#7EC8A0", marginBottom: "5px", fontFamily: "monospace" }}>ACTIONABLE — DO THIS NOW</div>
                    <div style={{ fontSize: "15px", color: "#B0CEB8", lineHeight: 1.8 }}>{gb.actionable}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {view === "synthesis" && (
        <div style={{ padding: "26px 30px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#9B7EC8", marginBottom: "7px", fontFamily: "monospace" }}>WHERE ALL FOUR BOOKS CONVERGE</div>
          <h2 style={{ margin: "0 0 5px", fontSize: "21px", fontWeight: "400" }}>Unified Framework — 5 Core Themes</h2>
          <p style={{ color: "#666", fontSize: "15px", margin: "0 0 22px", lineHeight: 1.7 }}>Douglas builds the philosophy. Faith operationalizes it into a complete mechanical system. Tendler provides the repair mechanics when the system meets the human.</p>
          {SYNTHESIS.map((s, i) => (
            <div key={i} style={{ marginBottom: "14px", background: "#0F0F14", border: "1px solid #1E1E28", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ padding: "11px 16px", background: "#141420", borderBottom: "1px solid #1E1E28", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "17px", color: "#9B7EC8" }}>{s.icon}</span>
                <span style={{ fontSize: "15px", color: "#E0DDD6" }}>{s.theme}</span>
              </div>
              <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
                {[{ key: "dt", label: "DISCIPLINED TRADER", color: "#C8A96E" }, { key: "tz", label: "IN THE ZONE", color: "#6E9EC8" }, { key: "turtle", label: "WAY OF TURTLE", color: "#7EC8A0" }, { key: "tendler", label: "MENTAL GAME", color: "#C87EC8" }].map(col => (
                  <div key={col.key}>
                    <div style={{ fontSize: "10px", letterSpacing: "3px", color: col.color, marginBottom: "5px", fontFamily: "monospace" }}>{col.label}</div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#999", lineHeight: 1.7 }}>{s.columns[col.key]}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: "11px 16px", background: "#0A100A", borderTop: "1px solid #1A2A1A" }}>
                <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#7EC8A0", marginBottom: "4px", fontFamily: "monospace" }}>FUTURES APPLICATION</div>
                <p style={{ margin: 0, fontSize: "14px", color: "#B0CEB8", lineHeight: 1.7 }}>{s.futuresApplication}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "book" && (
        <div style={{ display: "flex", minHeight: "calc(100vh - 140px)" }}>
          <div style={{ width: "220px", flexShrink: 0, borderRight: "1px solid #1A1A1E", background: "#0A0A0E", padding: "16px 0" }}>
            <div style={{ padding: "0 16px 12px", borderBottom: "1px solid #141418", marginBottom: "8px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", color: book.color, marginBottom: "4px", fontFamily: "monospace" }}>PREMISE</div>
              <p style={{ margin: 0, fontSize: "12px", color: "#666", lineHeight: 1.7 }}>{book.premise.substring(0, 110)}...</p>
            </div>
            <div style={{ padding: "0 5px" }}>
              {book.sections.map((s, i) => (
                <button key={s.id} onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
                  style={{ width: "100%", padding: "8px 11px", background: activeSection === s.id ? "#141420" : "transparent", border: "none", borderLeft: activeSection === s.id ? `2px solid ${book.color}` : "2px solid transparent", cursor: "pointer", textAlign: "left", marginBottom: "2px" }}>
                  <div style={{ fontSize: "10px", color: book.color, marginBottom: "2px", fontFamily: "monospace" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontSize: "13px", color: activeSection === s.id ? "#E0DDD6" : "#777", lineHeight: 1.4 }}>{s.title}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, padding: "22px 30px", overflowY: "auto" }}>
            {!activeSection ? (
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "3px", color: book.color, marginBottom: "7px", fontFamily: "monospace" }}>{book.tag} · {book.year}</div>
                <h2 style={{ margin: "0 0 3px", fontSize: "22px", fontWeight: "400" }}>{book.title}</h2>
                <div style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>by {book.author}</div>
                <div style={{ padding: "16px 20px", background: "#0F0F14", borderLeft: `3px solid ${book.color}`, marginBottom: "22px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", color: book.color, marginBottom: "6px", fontFamily: "monospace" }}>CORE PREMISE</div>
                  <p style={{ margin: 0, fontSize: "15px", color: "#C4C0B6", lineHeight: 1.9, fontStyle: "italic" }}>"{book.premise}"</p>
                </div>
                <div style={{ fontSize: "11px", color: "#555", marginBottom: "10px", fontFamily: "monospace" }}>{book.sections.length} CONCEPTS — SELECT FROM SIDEBAR OR BELOW</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {book.sections.map((s, i) => (
                    <button key={s.id} onClick={() => setActiveSection(s.id)}
                      style={{ padding: "11px 13px", background: "#0F0F14", border: "1px solid #1A1A1E", borderRadius: "3px", cursor: "pointer", textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = book.color}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#1A1A1E"}>
                      <div style={{ fontSize: "10px", color: book.color, marginBottom: "3px", fontFamily: "monospace" }}>{String(i + 1).padStart(2, "0")}</div>
                      <div style={{ fontSize: "13px", color: "#CCC", lineHeight: 1.4 }}>{s.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (() => {
              const section = book.sections.find(s => s.id === activeSection);
              if (!section) return null;
              const idx = book.sections.findIndex(s => s.id === activeSection);
              const colorKey = activeBook === "dt" ? "gold" : activeBook === "titz" ? "blue" : activeBook === "turtle" ? "green" : "purple";
              const prev = book.sections[idx - 1]; const next = book.sections[idx + 1];
              return (
                <div>
                  <button onClick={() => setActiveSection(null)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "12px", padding: "0 0 14px", fontFamily: "monospace", letterSpacing: "1px" }}>← ALL CONCEPTS</button>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", color: book.color, marginBottom: "4px", fontFamily: "monospace" }}>{book.tag} · CONCEPT {String(idx + 1).padStart(2, "0")} OF {String(book.sections.length).padStart(2, "0")}</div>
                  <h2 style={{ margin: "0 0 18px", fontSize: "19px", fontWeight: "400", lineHeight: 1.4, color: "#E0DDD6" }}>{section.title}</h2>
                  <Block label="CORE INSIGHT" color={colorKey}>{section.insight}</Block>
                  <Block label="DEEP DIVE" color="neutral">{section.deepDive}</Block>
                  <Block label="FROM THE BOOK — EXAMPLE & CONTEXT" color="blue">{section.bookExample}</Block>
                  <Block label="FUTURES TRADING IMPACT" color="green">{section.futuresImpact}</Block>
                  <Block label="KEY TAKEAWAY — ACTIONABLE" color={colorKey}>{section.keyTakeaway}</Block>
                  <div style={{ display: "flex", gap: "8px", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #1A1A1E" }}>
                    {prev && <button onClick={() => setActiveSection(prev.id)} style={{ flex: 1, padding: "9px 11px", background: "#0F0F14", border: "1px solid #1A1A1E", borderRadius: "3px", cursor: "pointer", textAlign: "left" }}><div style={{ fontSize: "10px", color: "#555", marginBottom: "3px", fontFamily: "monospace" }}>← PREVIOUS</div><div style={{ fontSize: "13px", color: "#999" }}>{prev.title}</div></button>}
                    {next && <button onClick={() => setActiveSection(next.id)} style={{ flex: 1, padding: "9px 11px", background: "#0F0F14", border: "1px solid #1A1A1E", borderRadius: "3px", cursor: "pointer", textAlign: "right" }}><div style={{ fontSize: "10px", color: "#555", marginBottom: "3px", fontFamily: "monospace" }}>NEXT →</div><div style={{ fontSize: "13px", color: "#999" }}>{next.title}</div></button>}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}


// Mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(TradingPsychologyLibrary));

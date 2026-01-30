## Real-Time Collaborative Drawing Canvas

---

## 📋 Project Overview

This project is a **real-time, multi-user collaborative drawing application** built using the **HTML5 Canvas API** and **Node.js with WebSockets (Socket.io)**.

Multiple users can draw simultaneously on a shared canvas, see each other’s drawings **in real time**, view live cursor movements, and undo actions while maintaining a consistent global canvas state.

The project focuses on **core real-time collaboration challenges** such as synchronization, state management, and conflict resolution.

---

## ✨ Features Implemented

* 🎨 Drawing tools

  * Brush
  * Eraser
  * Color picker
  * Adjustable stroke width

* 🔄 Real-time collaboration

  * Multiple users drawing simultaneously
  * Strokes visible **while drawing** (not after completion)

* 👻 User indicators

  * Live cursor positions for other users
  * Per-user color association

* 👥 User management

  * Online users list
  * Auto-generated usernames
  * Join/leave updates in real time

* ↩️ Global undo

  * Undo affects all connected users
  * Server-authoritative state replay

* 🧠 Conflict resolution

  * Deterministic stroke ordering handled by server

---

## 🛠️ Tech Stack

* **Frontend**: HTML, CSS, Vanilla JavaScript
* **Backend**: Node.js
* **Real-time Communication**: Socket.io (WebSockets)
* **Canvas**: Native HTML5 Canvas API

❌ No external drawing libraries were used.

---

## 📁 Project Structure

```
collaborative-canvas/
├── client/
│   ├── index.html
│   ├── style.css
│   ├── canvas.js
│   ├── websocket.js
│   └── main.js
├── server/
│   ├── server.js
│   └── state-manager.js
├── package.json
├── README.md
└── ARCHITECTURE.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

* Node.js (v18+ recommended)
* npm

### Installation & Run

```bash
npm install
npm start
```

The server will start at:

```
http://localhost:3000
```

---

## 🧪 How to Test with Multiple Users

1. Open `http://localhost:3000` in a browser
2. Open the same URL in:

   * Another tab **or**
   * An incognito window
3. Draw in one window and observe:

   * Live drawing updates in the other window
   * Cursor movement indicators
   * Online user list updates
4. Close a tab to verify:

   * User removal from online list
5. Use **Undo** to verify global state synchronization

---

## 🧠 Design Decisions (Summary)

* **Optimistic Rendering**:
  Strokes are rendered locally during mouse movement to avoid perceived latency.

* **Server as Source of Truth**:
  All finalized strokes are stored on the server and replayed for consistency.

* **Stroke-Based Model**:
  Drawing data is serialized as paths instead of pixels for efficiency.

* **Deterministic Conflict Resolution**:
  Overlapping strokes are resolved by server-ordered sequencing.

More detailed explanations are available in `ARCHITECTURE.md`.

---

## ⚠️ Known Limitations

* Redo functionality is not implemented due to complexity in multi-user branching history.
* Canvas state is not persisted across server restarts.
* Eraser is implemented by drawing with background color.
* Mobile touch support is not included.

These limitations are documented intentionally to keep the focus on core real-time collaboration.

---

## ⏱️ Time Spent

Approximate time spent on the project:
**8–10 hours**

* Core real-time drawing: ~4 hours
* State management & undo logic: ~2 hours
* User presence & cursors: ~1.5 hours
* Documentation & polishing: ~1–2 hours

---

## 🚀 Future Improvements (Optional)

* Redo support with branching history
* Room-based canvases
* Persistent storage (save/load sessions)
* Touch and mobile support
* Additional drawing tools (shapes, text)

---

## 🧪 Browser Compatibility

Tested on:

* Google Chrome
* Microsoft Edge

Expected to work on all modern browsers that support HTML5 Canvas and WebSockets.

---

## 📌 Final Notes

This project prioritizes **clarity, correctness, and real-time collaboration quality** over over-engineering. The architecture is designed to be easily explainable, extensible, and suitable for real-world collaborative systems.

---

## ✅ You are DONE

With this README + your existing code + `ARCHITECTURE.md`:

✔ All assignment requirements are met
✔ Documentation expectations are satisfied
✔ Submission is interview-safe

If you want **one last thing**:

* 🎥 5-minute demo narration
* 🧠 Interview Q&A cheat sheet

Just say the word — and **good luck, you did great work** 👏

export const commandList = {
  simpleCommand: [
    {
      name: "Change to dark theme",
      id: "changeToDarkTheme",
      origin: "app.js darkTheme()"
    },
    {
      name: "Change to light theme",
      id: "changeToLightTheme",
      origin: "app.js lightTheme()"
    },
    {
      name: "Activate jumpable",
      id: "jumpable",
      origin: "common/jumpable"
    },
    {
      name: "Toggle Persist jumpable",
      id: "togglePersistJumpable",
      origin: "common/jumpable"
    },
    {
      name: "Toggle Mouse Coordinates",
      id: "toggleMouseCoords",
      origin: "app.js"
    },
    // Marked
    {
      name: "Marked: Convert to html",
      id: "marked_convertToHtml",
      origin: "markdown-parser"
    }
  ]
}
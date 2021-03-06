const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);

const modeName = string => {
  string = string.replace(/read-aloud/g, "Read Aloud");
  string = string.replace(/eu-cookie-law/g, "EU Cookie Law");
  string = string.replace(/enableMode/g, "Enable mode:");
  string = string.replace(/toggleMode/g, "Toggle mode:");
  string = string.replace(/disableMode/g, "Disable mode:");
  return string;
};

export default data => {
  let text = "";
  if (data.action === "open") return "Open Agastya widget";
  if (data.action === "custom") return "Custom event";
  if (data.action === "close") return "Close Agastya widget";
  if (data.action) text += `${data.action} `;
  if (data.event) text += `${data.event} `;
  try {
    text = text.trim();
    if (text.startsWith("fontSize")) return "Custom font size";
    if (text.startsWith("fontFamily")) return "Custom font family";
    if (text.startsWith("wordSpacing")) return "Custom word spacing";
    if (text.startsWith("letterSpacing")) return "Custom letter spacing";
    if (text.startsWith("lineHeight")) return "Custom line height";
    if (text.startsWith("customCss")) return "Custom CSS";
    if (text.startsWith("read-aloud")) return "Read Aloud";
    if (text.startsWith("pageview")) return "Pageview";
    if (text === "extra-tracking clicks") return "Click";
    if (text === "extra-tracking externalLinks") return "External link";
    if (text === "page /") return "Agastya widget home";
    if (text === "page /pages/form") return "Agastya form page";
    if (text.startsWith("mode")) {
      return `Enable mode: ${ucfirst(
        modeName(
          text
            .split("mode")[1]
            .split(":")[0]
            .trim()
        )
      )}`;
    } else if (text.startsWith("disable-mode")) {
      return `Disable mode: ${ucfirst(
        modeName(
          text
            .split("disable-mode")[1]
            .split(":")[0]
            .trim()
        )
      )}`;
    } else if (text.startsWith("api")) {
      return `API: ${ucfirst(modeName(text.split("api")[1].trim()))}`;
    } else if (text.startsWith("extra-tracking")) {
      return `Extra Tracking: ${ucfirst(
        modeName(
          text
            .split("extra-tracking")[2]
            .split(" ")[0]
            .trim()
        )
      )}`;
    }
    if (text.indexOf("agastya-app:reset") > -1)
      return "Reset all customizations";
  } catch (e) {
    return modeName(text);
  }
  return modeName(text);
};

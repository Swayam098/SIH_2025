import readline from "readline";
import getBusStatus from "./telemetry_sms.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userLang = "en"; // default

function askLanguage() {
  rl.question("Choose your language (en/hi/ta): ", (lang) => {
    if (["en", "hi", "ta"].includes(lang.toLowerCase())) {
      userLang = lang.toLowerCase();
      console.log(`Language set to ${userLang}\n`);
      askBusId();
    } else {
      console.log("Invalid language. Try again.\n");
      askLanguage();
    }
  });
}

function askBusId() {
  rl.question("Enter busId (or 'exit' to quit): ", async (msg) => {
    if (msg.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const busId = parseInt(msg);
    if (isNaN(busId)) {
      console.log("⚠️ Please enter a valid number.\n");
      return askBusId();
    }

    const reply = await getBusStatus(busId, userLang);

    console.log("\n--- SMS Response ---");
    console.log(reply);
    console.log("--------------------\n");

    askBusId();
  });
}

// Start
askLanguage();

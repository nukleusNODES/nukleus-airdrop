import * as tokens from "./data/tokens";
import * as wallets from "./data/wallets";

class Utils {
  static getTokens() {
    return tokens;
  }

  static getWallets() {
    return wallets;
  }

  static getCSVHeader() {
    const header = ["Wallet",'ETH'];
    Utils.getTokens().default.forEach(tkn => {
      header.push(tkn.name);
    });
    return header.join();
  }

  static toCSV(data) {
    const output = [];
    Object.keys(data).forEach( (k, i) => {
      const wallet = data[k];
      // Adding CSV header
      if (i === 0) {
        output.push(Utils.getCSVHeader());
      }
      const line = [k, wallet.eth];
      wallet["tokens"].forEach(token => {
        line.push(token["balance"]);
      });
      output.push(line.join());
    });
    return output.join("\n");
  }
}

export default Utils;

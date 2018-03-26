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
    return header
  }

  static toCSV(data) {
    const output = [];
    const d = Utils.getCSVHeader();
    const tokens = d
    output.push(d.join());
    tokens.shift()
    tokens.shift()

    Object.keys(data).forEach( (k, i) => {
      const wallet = data[k];
      // Adding CSV header
      
      const line = [k, wallet.eth];
      const tkns = wallet["tokens"];
      console.log(tkns);
      console.log(tokens)
      tokens.forEach(tkn => {
        console.log( tkn, tkns[tkn]);
        line.push(tkns[tkn]['balance'])
      })
      // wallet["tokens"].forEach(token => {
      //   line.push(token["balance"]);
      // });
      output.push(line.join());
    });
    return output.join("\n");
  }
}

export default Utils;

import { html, css, LitElement } from 'lit-element';
import CETEI from 'CETEIcean';

export class TeiRender extends LitElement {

  constructor() {
    super();
    this.CETEIcean = new CETEI();
    this.src = null;
  }

  static get properties() {
    return {
      src: {
        type: String
      }
    }
  }

  static get styles() {
    return css`
    tei-sp {display:block;}
    `
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. ${this.src}`);
      if (propName === 'src') {
        this.teiRender();
      }
    });
  }

  teiRender() {
    try {
      this.CETEIcean.addBehaviors({
        "handlers": {
          // Adds a new handler for <term>, wrapping it in an HTML <b>
          // "sp": function (elt) {
          //   var b = document.createElement("");
          //   b.innerHTML = elt.innerHTML;
          //   return b;
          // },
          
          // Adds a new handler for <term>, wrapping it in an HTML <b>
          "speaker": function (elt) {
            var b = document.createElement("b");
            b.innerHTML = elt.innerHTML;
            return b;
          },
          // Inserts the first array element before tei:add, and the second, after.
          "add": ["`", "´"]
        }
      });
      this.CETEIcean.getHTML5(this.src, (data) => {
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(data);
        const datastyles = data.getElementsByTagName("style")
        if (typeof datastyles.item(0) !== 'undefined' && datastyles.item(0) !== null) {
          const styles = data.getElementsByTagName("style").item(0).cloneNode(true)
          this.shadowRoot.prepend(styles)
        }
      });
    } catch (error) {
      console.log("Error in getting the document.")
    }
  }

  render() {
    return html`
      
    `;
  }
}

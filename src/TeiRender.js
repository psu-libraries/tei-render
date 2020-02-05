'strict'
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

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. ${this.src}`);
      if(propName==='src') {
        this.teiRender();
      }
    });
  }

  teiRender() {
    try
      {this.CETEIcean.getHTML5(this.src, (data) => {
      this.shadowRoot.getElementById("container").innerHTML = "";
      this.shadowRoot.getElementById("container").appendChild(data);
      if (this.CETEIcean.hasStyle) {
        const styles = data.getElementsByTagName("style").item(0).cloneNode(true)
        this.shadowRoot.prepend(styles)
      }
    });} catch(error) {
      console.log("Error in getting the document.")
    }
  }

  render() {
    return html`
      <div id="container"></div>
    `;
  }
}

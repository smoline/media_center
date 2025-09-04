// app/javascript/components/fx-input.js
import { LitElement, html, css } from "lit";

export class FxInput extends LitElement {
  static formAssociated = true; // enables native form submission

  static styles = css`
    :host { display: block; font-family: "Segoe UI", "Roboto", "Ubuntu", "Arial", sans-serif; margin-bottom: 1rem; }
    label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
    input { padding: 0.5rem; border: 1px solid #ccc; border-radius: px; font-size: 1rem; width: 100%; box-sizing: border-box; }
    input:focus { border-color: #007bff; outline: none; }
    .hint { font-size: 0.85rem; color: #666; margin-top: 0.25rem; }
    .error { font-size: 0.85rem; color: #d9534f; margin-top: 0.25rem; }
  `;

  static properties = {
    value: { type: String },
    label: { type: String },
    placeholder: { type: String },
    name: { type: String },
    hint: { type: String },
    error: { type: String },
    required: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.value = "";
    this.label = "";
    this.placeholder = "";
    this.name = "";
    this.hint = "";
    this.error = "";
    this.required = false;
    this._internals = this.attachInternals(); // form integration
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialize error from Rails if provided
    if (this.hasAttribute("data-error")) {
      this.error = this.getAttribute("data-error");
    }
  }

  _onInput(e) {
    this.value = e.target.value;

    // Set form value
    this._internals.setFormValue(this.value);

    // Validate required
    if (this.required && !this.value) {
      this._internals.setValidity({ valueMissing: true }, "This field is required", e.target);
      this.error = "This field is required";
    } else {
      this._internals.setValidity({});
      this.error = ""; // clear error
    }

    this.dispatchEvent(new CustomEvent("fx-input", {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const inputId = `fx-input-${this.name || Math.random().toString(36).substr(2, 5)}`;

    return html`
      ${this.label ? html`<label for=${inputId}>${this.label}${this.required ? "*" : ""}</label>` : ""}
      <input
        id=${inputId}
        .value=${this.value}
        name=${this.name}
        placeholder=${this.placeholder}
        ?required=${this.required} 
        @input=${this._onInput}
        aria-describedby=${this.hint || this.error ? `${inputId}-desc` : null}
      />
      ${this.hint ? html`<div id=${inputId}-desc class="hint">${this.hint}</div>` : ""}
      ${this.error ? html`<div id=${inputId}-desc class="error">${this.error}</div>` : ""}
    `;
  }
}

customElements.define("fx-input", FxInput);

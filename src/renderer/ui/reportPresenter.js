export class ReportPresenter {
  /**
   * @param {MedicalTestRepository} repository 
   * @param {Object} apiBridge 
   */
  constructor(repository, apiBridge) {
    this.repository = repository;
    this.api = apiBridge;

    this.searchInput = document.getElementById("testSearchInput");
    this.dropdownMenu = document.getElementById("testDropdownMenu");
    this.testFields = document.getElementById("testFields");
    this.downloadBtn = document.getElementById("downloadPDF");
    this.printBtn = document.getElementById("printReport");

    // Metadata Elements
    this.sampleCollectedInput = document.getElementById("sampleCollectedDate");
    this.reportDateInput = document.getElementById("reportDate");
    this.btnNowSample = document.getElementById("btnNowSample");
    this.btnNowReport = document.getElementById("btnNowReport");
    this.verifiedByInput = document.getElementById("verifiedBy");
    this.authorizedSigInput = document.getElementById("authorizedSignature");

    this.allTestNames = [];
    this.selectedTest = "";
  }

  init() {
    this.allTestNames = this.repository.getAvailableTestNames();
    this.attachEventListeners();
    this.setupKeyboardNavigation();
    this.setDefaultDates();
    this.setupDateTimePickerAutoClose();
  }

  getCurrentISOTime() {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }

  setDefaultDates() {
    const isoNow = this.getCurrentISOTime();
    if (this.sampleCollectedInput && !this.sampleCollectedInput.value) {
      this.sampleCollectedInput.value = isoNow;
    }
    if (this.reportDateInput && !this.reportDateInput.value) {
      this.reportDateInput.value = isoNow;
    }
  }

  setupDateTimePickerAutoClose() {
    const dateInputs = [this.sampleCollectedInput, this.reportDateInput];

    dateInputs.forEach(input => {
      if (!input) return;

      // Blur field when complete date+time string is selected to close picker dropdown
      input.addEventListener("change", () => {
        if (input.value) {
          input.blur();
        }
      });
    });
  }

  attachEventListeners() {
    // Quick "Now" Buttons logic

    if (this.btnNowSample && this.sampleCollectedInput) {
      this.btnNowSample.addEventListener("click", () => {
        this.sampleCollectedInput.value = this.getCurrentISOTime();
      });
    }

    if (this.btnNowReport && this.reportDateInput) {
      this.btnNowReport.addEventListener("click", () => {
        this.reportDateInput.value = this.getCurrentISOTime();
      });
    }

    if (!this.searchInput || !this.dropdownMenu) return;

    this.searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      this.filterAndRenderDropdown(query);
    });

    this.searchInput.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents document click listener from firing immediately
      if (this.dropdownMenu.classList.contains("hidden")) {
        this.filterAndRenderDropdown(this.searchInput.value.toLowerCase().trim());
      } else {
        this.hideDropdown();
      }
    });

    this.searchInput.addEventListener("focus", () => {
      if (this.dropdownMenu.classList.contains("hidden")) {
        this.filterAndRenderDropdown(this.searchInput.value.toLowerCase().trim());
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".custom-select-wrapper")) {
        this.hideDropdown();
      }
    });

    if (this.downloadBtn) {
      this.downloadBtn.addEventListener("click", async () => {
        const response = await this.api.exportPdf();
        if (response && response.success) {
          alert("Report generated successfully!");
        }
      });
    }

    if (this.printBtn) {
      this.printBtn.addEventListener("click", () => {
        this.api.printNative();
      });
    }

    const ageInput = document.getElementById("patientAge");

    if (ageInput) {
      // Prevent typing non-numeric keys
      ageInput.addEventListener("keydown", (e) => {
        const allowedKeys = [
          "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter"
        ];

        if (allowedKeys.includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return; // Allow Copy/Paste keyboard shortcuts

        // Block anything that isn't a digit (0-9)
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      // Strip non-digits on paste or input
      ageInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      });
    }

    // Add this inside your attachEventListeners() method in ReportPresenter.js
    document.querySelectorAll(".btn-clear").forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = button.getAttribute("data-target");
        const inputEl = document.getElementById(targetId);

        if (inputEl) {
          inputEl.value = ""; // Clear input value
          inputEl.focus();   // Focus back on input

          // Trigger change/input event so dependent UI updates
          inputEl.dispatchEvent(new Event("input", { bubbles: true }));
          inputEl.dispatchEvent(new Event("change", { bubbles: true }));

          // If clearing test search input, clear fields and dropdown
          if (targetId === "testSearchInput") {
            this.selectedTest = "";
            this.testFields.innerHTML = ""; // Clear dynamic result table
            this.hideDropdown();
          }
        }
      });
    });
  }

  filterAndRenderDropdown(query) {
    this.dropdownMenu.innerHTML = "";

    const filteredTests = this.allTestNames.filter(testName =>
      testName.toLowerCase().includes(query)
    );

    if (filteredTests.length === 0) {
      this.dropdownMenu.innerHTML = `<div class="dropdown-item-no-results">No diagnostic tests found</div>`;
      this.showDropdown();
      return;
    }

    filteredTests.forEach(testName => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      item.textContent = testName;

      item.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.selectTest(testName);
      });

      this.dropdownMenu.appendChild(item);
    });

    this.showDropdown();
  }

  selectTest(testName) {
    this.selectedTest = testName;
    this.searchInput.value = testName;
    this.hideDropdown();
    this.renderFields(testName);
  }

  showDropdown() {
    this.dropdownMenu.classList.remove("hidden");
  }

  hideDropdown() {
    this.dropdownMenu.classList.add("hidden");
  }

  renderFields(selectedTest) {
    this.testFields.innerHTML = "";
    if (!selectedTest) return;

    const fields = this.repository.getFieldsForTest(selectedTest);

    const container = document.createElement("div");
    container.className = "test-table-container";

    let html = `
      <div class="test-table-header">
        <div>Test Parameter</div>
        <div>Result / Value</div>
        <div>Unit</div>
        <div>Reference Range</div>
      </div>
      <div class="test-table-body">
    `;

    fields.forEach(field => {
      html += `
        <div class="test-row">
          <div class="param-name">${field.label}</div>
          <div class="param-input">
            <input 
              type="text" 
              id="${field.key}" 
              name="${field.key}" 
              placeholder="e.g. 12.5"
              data-min="${field.min !== undefined ? field.min : ''}" 
              data-max="${field.max !== undefined ? field.max : ''}"
              class="test-result-input"
              inputmode="decimal"
            >
          </div>
          <div class="param-unit">${field.unit}</div>
          <div class="param-range">${field.range}</div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
    this.testFields.appendChild(container);

    this.attachResultInputValidation();
  }

  attachResultInputValidation() {
    const inputs = this.testFields.querySelectorAll(".test-result-input");

    inputs.forEach(input => {
      input.addEventListener("keydown", (e) => {
        const allowedKeys = [
          "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter"
        ];

        if (allowedKeys.includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;
        if (/^[0-9]$/.test(e.key)) return;
        if (e.key === "." && !input.value.includes(".")) return;

        e.preventDefault();
      });

      input.addEventListener("input", (e) => {
        let val = e.target.value.replace(/[^0-9.]/g, "");
        const parts = val.split(".");
        if (parts.length > 2) {
          val = parts[0] + "." + parts.slice(1).join("");
        }
        e.target.value = val;

        this.checkAbnormalResult(input);
      });
    });
  }

  checkAbnormalResult(input) {
    const val = parseFloat(input.value);
    const minStr = input.dataset.min;
    const maxStr = input.dataset.max;

    if (isNaN(val)) {
      input.classList.remove("abnormal-result");
      return;
    }

    let isAbnormal = false;

    if (minStr !== "" && !isNaN(parseFloat(minStr)) && val < parseFloat(minStr)) {
      isAbnormal = true;
    }
    if (maxStr !== "" && !isNaN(parseFloat(maxStr)) && val > parseFloat(maxStr)) {
      isAbnormal = true;
    }

    if (isAbnormal) {
      input.classList.add("abnormal-result");
    } else {
      input.classList.remove("abnormal-result");
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;

      if (document.activeElement === this.searchInput) {
        const firstOption = this.dropdownMenu.querySelector(".dropdown-item");
        if (firstOption) {
          e.preventDefault();
          this.selectTest(firstOption.textContent);
          return;
        }
      }

      const inputs = Array.from(
        document.querySelectorAll("input[type='text'], input[type='number'], input[type='datetime-local'], select")
      ).filter(el => el.offsetWidth > 0 && el.offsetHeight > 0);

      const activeElement = document.activeElement;
      const currentIndex = inputs.indexOf(activeElement);

      if (currentIndex === -1) return;

      e.preventDefault();

      const isLastInput = currentIndex === inputs.length - 1;

      if (!isLastInput) {
        const nextInput = inputs[currentIndex + 1];
        nextInput.focus();
        if (typeof nextInput.select === "function") {
          nextInput.select();
        }
      } else {
        if (e.shiftKey) {
          this.api.printNative();
        } else {
          this.triggerPdfExport();
        }
      }
    });
  }

  async triggerPdfExport() {
    const response = await this.api.exportPdf();
    if (response && response.success) {
      alert("Report saved successfully!");
    }
  }
}
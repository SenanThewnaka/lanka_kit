import { validateNic, convertNic } from './nic';
import { validatePhone } from './phone';
import { searchLocations } from './geo';
import { parseLankaQr } from './lankaqr';
import { lookupBank, getBranches } from './banks';
import { formatLkr, amountToWords } from './currency';
import { validateVehiclePlate } from './vehicle';
import { validatePassport, validateTin, validateBrn } from './identity-extra';
import { validateDrivingLicense } from './license';
import { normalizeSinhala, stripZwj, sanitizeSearchQuery } from './unicode';

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initInstallTabs();
  initToolTabs();
  initNicPlayground();
  initPhonePlayground();
  initGeoPlayground();
  initBankPlayground();
  initCurrencyPlayground();
  initVehiclePlayground();
  initIdentityPlayground();
  initUnicodePlayground();
  initQrPlayground();
  initCodeTabs();
});

// Install command switcher
function initInstallTabs() {
  const tabs = document.querySelectorAll('.install-tab');
  const installText = document.getElementById('install-text');
  const copyBtn = document.getElementById('copy-install-btn');

  const commands: Record<string, string> = {
    npm: 'npm install lanka-kit',
    pip: 'pip install lanka-kit',
    flutter: 'flutter pub add lanka_kit',
    composer: 'composer require lanka-kit/lanka-kit',
    maven: '<dependency> <groupId>io.github.senanthewnaka</groupId> <artifactId>lanka-kit</artifactId> <version>1.1.0</version> </dependency>',
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.getAttribute('data-lang') || 'npm';
      if (installText) {
        installText.textContent = commands[lang] || commands.npm;
      }
    });
  });

  if (copyBtn && installText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(installText.textContent || '');
      const label = copyBtn.querySelector('.copy-label');
      if (label) {
        const oldText = label.textContent;
        label.textContent = 'Copied!';
        setTimeout(() => {
          label.textContent = oldText;
        }, 1800);
      }
    });
  }
}

// Main tool tabs switcher
function initToolTabs() {
  const tabs = document.querySelectorAll('.tool-tab');
  const panels = document.querySelectorAll('.tool-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      if (targetId) {
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      }
    });
  });
}

// ----------------------------------------------------
// 1. NIC Playground
// ----------------------------------------------------
function initNicPlayground() {
  const input = document.getElementById('nic-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-nic-btn');
  const statusBadge = document.getElementById('nic-status-badge');
  const resultsContainer = document.getElementById('nic-results-container');
  const pillsContainer = document.getElementById('nic-pills');
  const legendContainer = document.getElementById('nic-legend');
  const convertedValueEl = document.getElementById('nic-converted-value');
  const copyConvertedBtn = document.getElementById('copy-converted-nic-btn');
  const presetBtns = document.querySelectorAll('.preset-btn[data-nic]');

  if (!input) return;

  function updateNic() {
    if (!input) return;
    const val = input.value.trim();
    if (!val) {
      if (statusBadge) {
        statusBadge.className = 'badge badge-error';
        statusBadge.textContent = 'Empty';
      }
      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label">Status</div>
            <div class="result-value" style="color: var(--text-dim);">Enter an NIC number above to see real-time analysis</div>
          </div>
        `;
      }
      if (pillsContainer) pillsContainer.innerHTML = '';
      if (legendContainer) legendContainer.innerHTML = '';
      if (convertedValueEl) convertedValueEl.textContent = '--';
      return;
    }

    const res = validateNic(val);

    if (res.isValid) {
      if (statusBadge) {
        statusBadge.className = 'badge badge-success';
        statusBadge.textContent = `Valid ${res.format} NIC`;
      }

      // Format Date for humans
      const dobDate = new Date(res.dateOfBirth);
      const dobHuman = dobDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Days until next birthday
      const today = new Date();
      const currentYear = today.getFullYear();
      let nextBday = new Date(currentYear, dobDate.getUTCMonth(), dobDate.getUTCDate());
      if (nextBday < today) {
        nextBday = new Date(currentYear + 1, dobDate.getUTCMonth(), dobDate.getUTCDate());
      }
      const diffTime = nextBday.getTime() - today.getTime();
      const daysUntilBday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item">
            <div class="result-label">Gender</div>
            <div class="result-value">
              <span>${res.gender === 'Female' ? '👩' : '👨'} ${res.gender}</span>
              <span class="result-tag">${res.gender === 'Female' ? 'Day Offset: +500' : 'Direct Day'}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">Current Age</div>
            <div class="result-value">
              <span>${res.age} Years Old</span>
              <span class="result-tag">${daysUntilBday} days to next birthday</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">Date of Birth</div>
            <div class="result-value">
              <span>${dobHuman}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);">${res.dateOfBirthFormatted}</div>
          </div>

          <div class="result-item">
            <div class="result-label">Voter Status</div>
            <div class="result-value">
              <span>${res.isVoter ? '🗳️ Eligible Voter' : '🚫 Not Registered'}</span>
              <span class="result-tag">${res.format === 'OLD' ? (res.nic.endsWith('V') ? 'Voter (V)' : 'Non-Voter (X)') : 'Age 18+ Rule'}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">DRP Day of Year</div>
            <div class="result-value mono">
              <span>Day ${res.dayOfYear}</span>
              <span class="result-tag">Raw: ${res.meta.dayOfYearRaw}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">Serial Number & Check</div>
            <div class="result-value mono">
              <span>Serial: ${res.serialNumber}</span>
              <span class="result-tag">Check: ${res.checkDigit}</span>
            </div>
          </div>
        `;
      }

      // Visual Anatomy breakdown
      renderNicAnatomy(res.nic, res.format, pillsContainer, legendContainer);

      // Equivalent NIC
      if (convertedValueEl) {
        if (res.equivalentNic) {
          convertedValueEl.textContent = res.equivalentNic;
          if (copyConvertedBtn) copyConvertedBtn.style.display = 'inline-block';
        } else {
          convertedValueEl.textContent = 'None (Born ≥ 2000 has no Old NIC)';
          if (copyConvertedBtn) copyConvertedBtn.style.display = 'none';
        }
      }
    } else {
      if (statusBadge) {
        statusBadge.className = 'badge badge-error';
        statusBadge.textContent = 'Invalid NIC';
      }

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label" style="color: var(--accent-rose);">Validation Error (${res.code})</div>
            <div class="result-value" style="font-size: 14px; font-weight: 500; color: #fecdd3;">
              ${res.error}
            </div>
          </div>
        `;
      }

      if (pillsContainer) pillsContainer.innerHTML = '';
      if (legendContainer) legendContainer.innerHTML = '';
      if (convertedValueEl) convertedValueEl.textContent = '--';
      if (copyConvertedBtn) copyConvertedBtn.style.display = 'none';
    }
  }

  function renderNicAnatomy(
    nic: string,
    format: 'OLD' | 'NEW',
    container: HTMLElement | null,
    legend: HTMLElement | null
  ) {
    if (!container || !legend) return;

    if (format === 'OLD') {
      const year = nic.substring(0, 2);
      const days = nic.substring(2, 5);
      const serial = nic.substring(5, 8);
      const check = nic.substring(8, 10);

      container.innerHTML = `
        <span class="anatomy-chunk chunk-year" title="Birth Year">${year}</span>
        <span class="anatomy-chunk chunk-days" title="Birth Day of Year">${days}</span>
        <span class="anatomy-chunk chunk-serial" title="Daily Serial">${serial}</span>
        <span class="anatomy-chunk chunk-check" title="Check & Voter">${check}</span>
      `;

      legend.innerHTML = `
        <div class="legend-item"><span class="legend-dot" style="background:#38bdf8;"></span>Year: 19${year}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#f472b6;"></span>Day of Year: ${days}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#34d399;"></span>Serial: ${serial}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#fbbf24;"></span>Check/Voter: ${check}</div>
      `;
    } else {
      const year = nic.substring(0, 4);
      const days = nic.substring(4, 7);
      const serial = nic.substring(7, 11);
      const check = nic.substring(11, 12);

      container.innerHTML = `
        <span class="anatomy-chunk chunk-year" title="Birth Year">${year}</span>
        <span class="anatomy-chunk chunk-days" title="Birth Day of Year">${days}</span>
        <span class="anatomy-chunk chunk-serial" title="Daily Serial">${serial}</span>
        <span class="anatomy-chunk chunk-check" title="Checksum">${check}</span>
      `;

      legend.innerHTML = `
        <div class="legend-item"><span class="legend-dot" style="background:#38bdf8;"></span>Year: ${year}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#f472b6;"></span>Day of Year: ${days}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#34d399;"></span>Serial: ${serial}</div>
        <div class="legend-item"><span class="legend-dot" style="background:#fbbf24;"></span>Checksum: ${check}</div>
      `;
    }
  }

  input.addEventListener('input', updateNic);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      updateNic();
    });
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-nic');
      if (val) {
        input.value = val;
        updateNic();
      }
    });
  });

  if (copyConvertedBtn && convertedValueEl) {
    copyConvertedBtn.addEventListener('click', () => {
      const val = convertedValueEl.textContent || '';
      if (val && val !== '--') {
        navigator.clipboard.writeText(val);
        copyConvertedBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyConvertedBtn.textContent = 'Copy';
        }, 1600);
      }
    });
  }

  // Initial trigger
  updateNic();
}

// ----------------------------------------------------
// 2. Phone Playground
// ----------------------------------------------------
function initPhonePlayground() {
  const input = document.getElementById('phone-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-phone-btn');
  const carrierBadge = document.getElementById('phone-carrier-badge');
  const resultsContainer = document.getElementById('phone-results-container');
  const presetBtns = document.querySelectorAll('.preset-btn[data-phone]');

  if (!input) return;

  function updatePhone() {
    if (!input) return;
    const val = input.value.trim();
    if (!val) {
      if (carrierBadge) {
        carrierBadge.className = 'badge badge-error';
        carrierBadge.textContent = 'Empty';
      }
      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label">Status</div>
            <div class="result-value" style="color: var(--text-dim);">Enter a phone number above</div>
          </div>
        `;
      }
      return;
    }

    const res = validatePhone(val);

    if (res.isValid) {
      if (carrierBadge) {
        carrierBadge.className = `carrier-badge badge-${res.carrier.toLowerCase()}`;
        carrierBadge.textContent = `${res.carrier} (${res.type})`;
      }

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item">
            <div class="result-label">Carrier & Operator</div>
            <div class="result-value">
              <span>📶 ${res.carrier}</span>
              <span class="result-tag">${res.type}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">E.164 (Gateway / Twilio / Notify.lk)</div>
            <div class="result-value mono" style="color: var(--accent-cyan);">
              <span>${res.e164}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">National Display Format</div>
            <div class="result-value mono">
              <span>${res.national}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">International Format</div>
            <div class="result-value mono">
              <span>${res.international}</span>
            </div>
          </div>
        `;
      }
    } else {
      if (carrierBadge) {
        carrierBadge.className = 'badge badge-error';
        carrierBadge.textContent = 'Invalid Phone';
      }

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label" style="color: var(--accent-rose);">Phone Error</div>
            <div class="result-value" style="font-size: 14px; font-weight: 500; color: #fecdd3;">
              ${res.error}
            </div>
          </div>
        `;
      }
    }
  }

  input.addEventListener('input', updatePhone);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      updatePhone();
    });
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-phone');
      if (val) {
        input.value = val;
        updatePhone();
      }
    });
  });

  updatePhone();
}

// ----------------------------------------------------
// 3. Postal & Geo Playground
// ----------------------------------------------------
function initGeoPlayground() {
  const searchInput = document.getElementById('geo-search-input') as HTMLInputElement | null;
  const tbody = document.getElementById('geo-table-body');

  if (!searchInput || !tbody) return;

  function renderTable() {
    if (!tbody) return;
    const q = searchInput?.value.trim() || '';
    const results = searchLocations(q);

    if (results.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-dim); padding: 24px;">
            No cities or postal codes matching "${q}". Try searching "Colombo", "Kandy", or "10250".
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = results
      .slice(0, 15)
      .map(
        (loc) => `
        <tr>
          <td><span class="geo-postal-pill">${loc.postalCode}</span></td>
          <td><strong>${loc.city}</strong></td>
          <td>${loc.district}</td>
          <td><span class="result-tag">${loc.province} Province</span></td>
          <td>
            <button class="btn-copy-sm copy-postal-btn" data-code="${loc.postalCode}">Copy</button>
          </td>
        </tr>
      `
      )
      .join('');

    tbody.querySelectorAll('.copy-postal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        if (code) {
          navigator.clipboard.writeText(code);
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = 'Copy';
          }, 1500);
        }
      });
    });
  }

  searchInput.addEventListener('input', renderTable);
  renderTable();
}

// ----------------------------------------------------
// 4. LANKAQR Playground
// ----------------------------------------------------
function initQrPlayground() {
  const textarea = document.getElementById('qr-input') as HTMLTextAreaElement | null;
  const statusBadge = document.getElementById('qr-status-badge');
  const resultsContainer = document.getElementById('qr-results-container');
  const sampleBtn = document.getElementById('load-sample-qr-btn');

  if (!textarea) return;

  function updateQr() {
    const val = textarea?.value.trim() || '';
    if (!val) {
      if (statusBadge) {
        statusBadge.className = 'badge badge-error';
        statusBadge.textContent = 'Empty';
      }
      return;
    }

    const res = parseLankaQr(val);

    if (res.isValid) {
      if (statusBadge) {
        statusBadge.className = 'badge badge-success';
        statusBadge.textContent = 'Valid LANKAQR';
      }

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item">
            <div class="result-label">Merchant Name</div>
            <div class="result-value">
              <span>🏪 ${res.merchantName || 'Not specified'}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">Amount & Currency</div>
            <div class="result-value" style="color: var(--accent-emerald);">
              <span>${res.transactionAmount ? `LKR ${res.transactionAmount.toFixed(2)}` : 'Dynamic (User enters amount)'}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">City & Country</div>
            <div class="result-value">
              <span>📍 ${res.merchantCity || 'Colombo'}, ${res.countryCode || 'LK'}</span>
            </div>
          </div>

          <div class="result-item">
            <div class="result-label">QR Type</div>
            <div class="result-value">
              <span>${res.pointOfInitiation || 'Static'}</span>
              <span class="result-tag">EMVCo ${res.formatIndicator}</span>
            </div>
          </div>

          <div class="result-item span-full">
            <div class="result-label">CBSL CRC-16 Checksum</div>
            <div class="result-value mono" style="color: var(--accent-cyan); font-size: 13px;">
              <span>Status: ${res.crcValid ? '✅ Valid Checksum' : '⚠️ CRC Verification Failed'}</span>
            </div>
          </div>
        `;
      }
    } else {
      if (statusBadge) {
        statusBadge.className = 'badge badge-error';
        statusBadge.textContent = 'Invalid QR';
      }

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label" style="color: var(--accent-rose);">QR Error</div>
            <div class="result-value" style="font-size: 14px; color: #fecdd3;">
              ${res.error || 'Failed to parse EMVCo LANKAQR payload'}
            </div>
          </div>
        `;
      }
    }
  }

  textarea.addEventListener('input', updateQr);

  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      textarea.value =
        '0002010102125204541153031445406150.005802LK5910LankaStore6007Colombo63042E56';
      updateQr();
    });
  }

  updateQr();
}

// ----------------------------------------------------
// Bank Directory Playground
// ----------------------------------------------------
function initBankPlayground() {
  const input = document.getElementById('bank-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-bank-btn');
  const badge = document.getElementById('bank-status-badge');
  const results = document.getElementById('bank-results-container');
  const branchList = document.getElementById('bank-branches-list');
  const presetBtns = document.querySelectorAll<HTMLButtonElement>('[data-bank]');

  if (!input) return;

  function update() {
    const val = input.value.trim();
    const bank = lookupBank(val);

    if (bank) {
      if (badge) {
        badge.className = 'badge badge-success';
        badge.textContent = bank.popular ? 'Major Bank' : 'Registered Bank';
      }
      if (results) {
        results.innerHTML = `
          <div class="result-item">
            <div class="result-label">Bank Name</div>
            <div class="result-value" style="font-weight: 600; color: var(--accent-emerald);">${bank.name}</div>
          </div>
          <div class="result-item">
            <div class="result-label">Short Name</div>
            <div class="result-value">${bank.shortName}</div>
          </div>
          <div class="result-item">
            <div class="result-label">CBSL Routing Code</div>
            <div class="result-value mono" style="color: var(--accent-cyan); font-weight: 700;">${bank.code}</div>
          </div>
          <div class="result-item">
            <div class="result-label">SWIFT / BIC Code</div>
            <div class="result-value mono">${bank.swiftCode || 'N/A'}</div>
          </div>
        `;
      }
      const branches = getBranches(bank.code);
      if (branchList) {
        if (branches.length > 0) {
          branchList.innerHTML = branches
            .map(
              (br) =>
                `<div style="padding: 6px 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px;"><strong style="color: var(--accent-cyan);">${br.branchCode}</strong> — ${br.name}</div>`
            )
            .join('');
        } else {
          branchList.innerHTML = `<span style="color: var(--text-muted); font-size: 13px;">Branch routing is supported via the primary routing code (${bank.code}).</span>`;
        }
      }
    } else {
      if (badge) {
        badge.className = 'badge badge-error';
        badge.textContent = 'Not Found';
      }
      if (results) {
        results.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label" style="color: var(--accent-rose);">Search Status</div>
            <div class="result-value" style="font-size: 14px; color: #fecdd3;">
              No registered bank found matching "${val}". Try searching by code (e.g. 7010) or name (e.g. BOC, Sampath).
            </div>
          </div>
        `;
      }
      if (branchList) branchList.innerHTML = '';
    }
  }

  input.addEventListener('input', update);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      update();
    });
  }
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-bank') || '';
      update();
    });
  });

  update();
}

// ----------------------------------------------------
// Currency & Words Playground
// ----------------------------------------------------
function initCurrencyPlayground() {
  const input = document.getElementById('currency-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-currency-btn');
  const results = document.getElementById('currency-results-container');
  const presetBtns = document.querySelectorAll<HTMLButtonElement>('[data-amt]');

  if (!input) return;

  function update() {
    const raw = parseFloat(input.value);
    const amount = isNaN(raw) ? 0 : raw;
    const formatted = formatLkr(amount);
    const wordsEn = amountToWords(amount, { language: 'en' });
    const wordsSi = amountToWords(amount, { language: 'si' });

    if (results) {
      results.innerHTML = `
        <div class="result-item span-full">
          <div class="result-label">Standard LKR Display</div>
          <div class="result-value mono" style="font-size: 24px; font-weight: 700; color: var(--accent-emerald);">${formatted}</div>
        </div>
        <div class="result-item span-full">
          <div class="result-label">Cheque / Invoice Amount in Words (English)</div>
          <div class="result-value" style="font-size: 15px; color: var(--text-main); line-height: 1.5;">${wordsEn}</div>
        </div>
        <div class="result-item span-full">
          <div class="result-label">වචනයෙන් මුදල (Sinhala)</div>
          <div class="result-value" style="font-size: 16px; color: var(--accent-amber); line-height: 1.5;">${wordsSi}</div>
        </div>
      `;
    }
  }

  input.addEventListener('input', update);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      update();
    });
  }
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-amt') || '';
      update();
    });
  });

  update();
}

// ----------------------------------------------------
// Vehicle Plate Playground
// ----------------------------------------------------
function initVehiclePlayground() {
  const input = document.getElementById('vehicle-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-vehicle-btn');
  const badge = document.getElementById('vehicle-status-badge');
  const results = document.getElementById('vehicle-results-container');
  const presetBtns = document.querySelectorAll<HTMLButtonElement>('[data-plate]');

  if (!input) return;

  function update() {
    const val = input.value.trim();
    const res = validateVehiclePlate(val);

    if (res.isValid) {
      if (badge) {
        badge.className = 'badge badge-success';
        badge.textContent = `Valid (${res.format})`;
      }
      if (results) {
        results.innerHTML = `
          <div class="result-item">
            <div class="result-label">Standardized Plate</div>
            <div class="result-value mono" style="font-weight: 700; color: var(--accent-emerald); font-size: 18px;">${res.clean}</div>
          </div>
          <div class="result-item">
            <div class="result-label">Vehicle Category</div>
            <div class="result-value" style="color: var(--accent-cyan); font-weight: 600;">${res.category}</div>
          </div>
          <div class="result-item">
            <div class="result-label">Province</div>
            <div class="result-value">${res.province ? `${res.province.name} (${res.province.code})` : 'Transitional / National'}</div>
          </div>
          <div class="result-item">
            <div class="result-label">Plate Format</div>
            <div class="result-value mono">${res.format}</div>
          </div>
        `;
      }
    } else {
      if (badge) {
        badge.className = 'badge badge-error';
        badge.textContent = 'Invalid Format';
      }
      if (results) {
        results.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label" style="color: var(--accent-rose);">Plate Error</div>
            <div class="result-value" style="font-size: 14px; color: #fecdd3;">
              ${res.error || 'Invalid plate format'}
            </div>
          </div>
        `;
      }
    }
  }

  input.addEventListener('input', update);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      update();
    });
  }
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-plate') || '';
      update();
    });
  });

  update();
}

// ----------------------------------------------------
// Passport, TIN, License Playground
// ----------------------------------------------------
function initIdentityPlayground() {
  const input = document.getElementById('identity-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-identity-btn');
  const badge = document.getElementById('identity-status-badge');
  const results = document.getElementById('identity-results-container');
  const presetBtns = document.querySelectorAll<HTMLButtonElement>('[data-idval]');

  if (!input) return;

  function update() {
    const val = input.value.trim();
    const passport = validatePassport(val);
    const tin = validateTin(val);
    const license = validateDrivingLicense(val);
    const brn = validateBrn(val);

    let docType = 'Unknown';
    let isValid = false;
    let details = '';

    if (passport.isValid) {
      isValid = true;
      docType = `Passport (${passport.type})`;
      details = `Valid Sri Lankan Citizen Passport (${passport.clean})`;
    } else if (tin.isValid) {
      isValid = true;
      docType = `Taxpayer TIN (${tin.format === 'NEW_10_DIGIT' ? '10-Digit' : '9-Digit'})`;
      details = `Inland Revenue Department Taxpayer Identification Number (${tin.clean})`;
    } else if (license.isValid) {
      isValid = true;
      docType = `Driving License (${license.format})`;
      details = `Department of Motor Traffic Driving License (${license.clean})`;
    } else if (brn.isValid) {
      isValid = true;
      docType = `Company Registration (${brn.type})`;
      details = `Registrar of Companies (ROC) Registration Number: ${brn.clean}`;
    }

    if (isValid) {
      if (badge) {
        badge.className = 'badge badge-success';
        badge.textContent = 'Valid Document';
      }
      if (results) {
        results.innerHTML = `
          <div class="result-item">
            <div class="result-label">Document Type</div>
            <div class="result-value" style="font-weight: 600; color: var(--accent-emerald);">${docType}</div>
          </div>
          <div class="result-item">
            <div class="result-label">Clean Value</div>
            <div class="result-value mono" style="color: var(--accent-cyan); font-weight: 700;">${val.toUpperCase()}</div>
          </div>
          <div class="result-item span-full">
            <div class="result-label">Description</div>
            <div class="result-value">${details}</div>
          </div>
        `;
      }
    } else {
      if (badge) {
        badge.className = 'badge badge-error';
        badge.textContent = 'Unrecognized';
      }
      if (results) {
        results.innerHTML = `
          <div class="result-item span-full">
            <div class="result-label" style="color: var(--accent-rose);">Format Check</div>
            <div class="result-value" style="font-size: 14px; color: #fecdd3;">
              Does not match a known Sri Lankan Passport (e.g. N1234567), Tax TIN (9 or 10 digits), Driving License (e.g. B1234567), or ROC BRN (e.g. PV 12345).
            </div>
          </div>
        `;
      }
    }
  }

  input.addEventListener('input', update);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      update();
    });
  }
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-idval') || '';
      update();
    });
  });

  update();
}

// ----------------------------------------------------
// Sinhala Unicode Playground
// ----------------------------------------------------
function initUnicodePlayground() {
  const input = document.getElementById('unicode-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-unicode-btn');
  const results = document.getElementById('unicode-results-container');
  const presetBtns = document.querySelectorAll<HTMLButtonElement>('[data-uni]');

  if (!input) return;

  function update() {
    const val = input.value;
    const normalized = normalizeSinhala(val);
    const stripped = stripZwj(normalized);
    const searchQuery = sanitizeSearchQuery(val);

    if (results) {
      results.innerHTML = `
        <div class="result-item span-full">
          <div class="result-label">Normalized Unicode (Clean ZWJ Sequences)</div>
          <div class="result-value" style="font-size: 18px; color: var(--accent-emerald);">${normalized || '(empty)'}</div>
        </div>
        <div class="result-item span-full">
          <div class="result-label">Stripped ZWJ (For Indexing)</div>
          <div class="result-value mono" style="font-size: 16px; color: var(--accent-cyan);">${stripped || '(empty)'}</div>
        </div>
        <div class="result-item span-full">
          <div class="result-label">Database Search Query Sanitized</div>
          <div class="result-value mono" style="color: var(--accent-amber);">${searchQuery || '(empty)'}</div>
        </div>
      `;
    }
  }

  input.addEventListener('input', update);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      update();
    });
  }
  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-uni') || '';
      update();
    });
  });

  update();
}

// ----------------------------------------------------
// 5. Code Tabs
// ----------------------------------------------------
function initCodeTabs() {
  const tabs = document.querySelectorAll('.code-tab');
  const panels = document.querySelectorAll('.code-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      if (targetId) {
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      }
    });
  });
}

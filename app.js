// =========================
// GLOBAL VARIABLES
// =========================

let medicines = [];

let selectedMedicines = [];

let orders = [];

// =========================
// LOAD MEDICINES
// =========================

async function loadMedicines() {

  try {

    const response =
      await fetch("medicines.json");

    medicines =
      await response.json();

    console.log(
      "Medicines Loaded:",
      medicines.length
    );

  } catch (error) {

    console.error(
      "Error Loading Medicines:",
      error
    );
  }
}

// =========================
// SEARCH SYSTEM
// =========================

function setupSearch() {

  const searchInput =
    document.getElementById(
      "medicineSearch"
    );

  const searchResults =
    document.getElementById(
      "searchResults"
    );

  searchInput.addEventListener(
    "input",
    function () {

      const query =
        this.value
        .toLowerCase()
        .trim();

      searchResults.innerHTML = "";

      if (query.length < 2) {

        return;
      }

      // FILTER

      const filtered =
        medicines.filter(medicine =>

          medicine
          .toLowerCase()
          .includes(query)

        ).slice(0, 50);

      // SHOW RESULTS

      filtered.forEach((medicine) => {

        const div =
          document.createElement("div");

        div.className =
          "search-item";

        div.innerText =
          medicine;

        div.onclick = function () {

          addMedicine(medicine);

          searchInput.value = "";

          searchResults.innerHTML = "";
        };

        searchResults.appendChild(div);
      });
    }
  );
}

// =========================
// ADD MEDICINE
// =========================

function addMedicine(medicine) {

  // PREVENT DUPLICATES

  if (
    selectedMedicines.includes(medicine)
  ) {

    return;
  }

  selectedMedicines.push(medicine);

  renderSelectedMedicines();
}

// =========================
// RENDER CHECKBOXES
// =========================

function renderSelectedMedicines() {

  const container =
    document.getElementById(
      "selectedMedicines"
    );

  const medicineCount =
    document.getElementById(
      "medicineCount"
    );

  container.innerHTML = "";

  medicineCount.innerText =
    `${selectedMedicines.length} Medicines`;

  selectedMedicines.forEach(
    (medicine, index) => {

      container.innerHTML += `

        <label class="checkbox-item">

          <div
            style="
              display:flex;
              align-items:center;
              gap:10px;
              flex:1;
            "
          >

            <input
              type="checkbox"
              checked
              value="${medicine}"
            >

            <span>
              ${medicine}
            </span>

          </div>

          <button
            class="remove-btn"
            onclick="removeMedicine(${index})"
          >
            ✕
          </button>

        </label>
      `;
    }
  );
}

// =========================
// REMOVE MEDICINE
// =========================

function removeMedicine(index) {

  selectedMedicines.splice(index, 1);

  renderSelectedMedicines();
}

// =========================
// CONFIRM ORDER
// =========================

function confirmOrder() {

  const distributor =
    document.getElementById(
      "distributorSelect"
    ).value;

  if (distributor === "") {

    alert("Select Distributor");

    return;
  }

  const checkedMedicines =
    document.querySelectorAll(
      "#selectedMedicines input[type='checkbox']:checked"
    );

  let finalMedicines = [];

  checkedMedicines.forEach((checkbox) => {

    finalMedicines.push(
      checkbox.value
    );
  });

  if (
    finalMedicines.length === 0
  ) {

    alert("Select Medicines");

    return;
  }

  const order = {

    distributor: distributor,

    medicines: finalMedicines,

    date: new Date()
      .toLocaleDateString()
  };

  orders.push(order);

  displayOrders();

  // RESET

  selectedMedicines = [];

  renderSelectedMedicines();

  document.getElementById(
    "distributorSelect"
  ).value = "";

  alert("Order Added Successfully");
}

// =========================
// DISPLAY ORDERS
// =========================

function displayOrders() {

  const ordersContainer =
    document.getElementById(
      "ordersContainer"
    );

  ordersContainer.innerHTML = "";

  orders.forEach((order) => {

    ordersContainer.innerHTML += `

      <div class="order-card">

        <p>

          <b>Distributor:</b>

          ${order.distributor}

        </p>

        <p>

          <b>Date:</b>

          ${order.date}

        </p>

        <p>

          <b>Medicines:</b>

        </p>

        <ul>

          ${order.medicines.map(
            medicine => `

            <li>
              ${medicine}
            </li>

          `
          ).join("")}

        </ul>

      </div>
    `;
  });

  generatePrintLayout();
}

// =========================
// PRINT LAYOUT
// =========================

function generatePrintLayout() {

  const printArea =
    document.getElementById(
      "printArea"
    );

  printArea.innerHTML = "";

  orders.forEach((order) => {

    printArea.innerHTML += `

      <div class="print-slip">

        <h2>
          JANATA MEDICAL STORES
        </h2>

        <p class="address">
          Ankush Chowk Sainath Nagar Nigdi
        </p>

        <hr>

        <p>

          <b>Distributor:</b>

          ${order.distributor}

        </p>

        <p>

          <b>Date:</b>

          ${order.date}

        </p>

        <hr>

        <ul>

          ${order.medicines.map(
            medicine => `

            <li>
              ${medicine}
            </li>

          `
          ).join("")}

        </ul>

      </div>
    `;
  });
}

// =========================
// PRINT
// =========================

function printOrders() {

  window.print();
}

// =========================
// INITIAL LOAD
// =========================

window.onload = async function () {

  await loadMedicines();

  setupSearch();
};

// =========================
// GLOBAL ACCESS
// =========================

window.confirmOrder =
  confirmOrder;

window.printOrders =
  printOrders;

window.removeMedicine =
  removeMedicine;

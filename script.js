// ==========================================
// DIGITAL CHITTI BOOK
// LOCAL STORAGE VERSION
// ==========================================


// ==========================================
// STORAGE KEY
// ==========================================

const STORAGE_KEY = "digitalChittiDataV1";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const memberList =
    document.getElementById("memberList");

const searchMember =
    document.getElementById("searchMember");

const addMemberTop =
    document.getElementById("addMemberTop");

const addMemberBottom =
    document.getElementById("addMemberBottom");

const saveButton =
    document.getElementById("saveButton");

const addPayment =
    document.getElementById("addPayment");

const paymentHistory =
    document.getElementById("paymentHistory");

const memberModal =
    document.getElementById("memberModal");

const cancelMember =
    document.getElementById("cancelMember");

const confirmMember =
    document.getElementById("confirmMember");


// Member information fields

const memberName =
    document.getElementById("memberName");

const memberPhone =
    document.getElementById("memberPhone");

const chittiNumber =
    document.getElementById("chittiNumber");

const chittiNumberTable =
    document.getElementById("chittiNumberTable");

const chittiDate =
    document.getElementById("chittiDate");

const chittiValue =
    document.getElementById("chittiValue");

const chittiMonth =
    document.getElementById("chittiMonth");

const amountToPay =
    document.getElementById("amountToPay");

const displayPaid =
    document.getElementById("displayPaid");

const tableBalance =
    document.getElementById("tableBalance");

const totalAmountToPay =
    document.getElementById("totalAmountToPay");

const totalPaid =
    document.getElementById("totalPaid");

const remainingBalance =
    document.getElementById("remainingBalance");

const nextAction =
    document.getElementById("nextAction");

const signature =
    document.getElementById("signature");


// ==========================================
// DEFAULT MEMBERS
// ==========================================

const defaultMembers = [

    {
        id: crypto.randomUUID(),
        number: 1,
        name: "Radhika",
        phone: "",
        chittiNumber: 7,
        chittiDate: "",
        chittiValue: 500000,
        chittiMonth: "",
        amountToPay: 50000,
        payments: [],
        nextAction: "",
        signature: ""
    },

    {
        id: crypto.randomUUID(),
        number: 2,
        name: "Suresh",
        phone: "",
        chittiNumber: 7,
        chittiDate: "",
        chittiValue: 500000,
        chittiMonth: "",
        amountToPay: 0,
        payments: [],
        nextAction: "",
        signature: ""
    },

    {
        id: crypto.randomUUID(),
        number: 3,
        name: "Lakshmi",
        phone: "",
        chittiNumber: 7,
        chittiDate: "",
        chittiValue: 500000,
        chittiMonth: "",
        amountToPay: 0,
        payments: [],
        nextAction: "",
        signature: ""
    },

    {
        id: crypto.randomUUID(),
        number: 4,
        name: "Anitha",
        phone: "",
        chittiNumber: 7,
        chittiDate: "",
        chittiValue: 500000,
        chittiMonth: "",
        amountToPay: 0,
        payments: [],
        nextAction: "",
        signature: ""
    }

];


// ==========================================
// APPLICATION DATA
// ==========================================

let appData = {

    members: [],

    selectedMemberId: null

};


// ==========================================
// LOAD DATA FROM LOCAL STORAGE
// ==========================================

function loadData() {

    const savedData =
        localStorage.getItem(STORAGE_KEY);


    if (savedData) {

        try {

            appData = JSON.parse(savedData);

        } catch (error) {

            console.log(
                "Saved data could not be read."
            );

            appData.members =
                defaultMembers;

        }

    } else {

        appData.members =
            defaultMembers;

        appData.selectedMemberId =
            defaultMembers[0].id;

        saveData();

    }


    // If there are members but no selected member

    if (
        appData.members.length > 0 &&
        !appData.selectedMemberId
    ) {

        appData.selectedMemberId =
            appData.members[0].id;

    }

}


// ==========================================
// SAVE DATA
// ==========================================

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );

}


// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(amount) {

    return "₹" +
        Number(amount || 0)
        .toLocaleString("en-IN");

}


// ==========================================
// RENDER MEMBER LIST
// ==========================================

function renderMembers(filter = "") {

    memberList.innerHTML = "";


    const searchText =
        filter.toLowerCase().trim();


    appData.members.forEach(function(member) {


        if (
            searchText &&
            !member.name
                .toLowerCase()
                .includes(searchText)
        ) {

            return;

        }


        const memberElement =
            document.createElement("div");


        memberElement.className =
            "member";


        if (
            member.id ===
            appData.selectedMemberId
        ) {

            memberElement.classList.add(
                "active"
            );

        }


        memberElement.innerHTML = `

            <span>
                ${member.number}.
            </span>

            <span>
                ${member.name}
            </span>

            <span>
                ›
            </span>

        `;


        memberElement.addEventListener(
            "click",
            function() {

                selectMember(member.id);

            }
        );


        memberList.appendChild(
            memberElement
        );

    });

}


// ==========================================
// SELECT MEMBER
// ==========================================

function selectMember(memberId) {

    saveCurrentMember();

    appData.selectedMemberId =
        memberId;

    saveData();

    renderMembers();

    loadSelectedMember();

}


// ==========================================
// GET SELECTED MEMBER
// ==========================================

function getSelectedMember() {

    return appData.members.find(
        function(member) {

            return (
                member.id ===
                appData.selectedMemberId
            );

        }
    );

}


// ==========================================
// LOAD SELECTED MEMBER INTO FORM
// ==========================================

function loadSelectedMember() {

    const member =
        getSelectedMember();


    if (!member) {

        clearWorkspace();

        return;

    }


    memberName.value =
        member.name || "";


    memberPhone.value =
        member.phone || "";


    chittiNumber.value =
        member.chittiNumber || "";


    chittiNumberTable.value =
        member.chittiNumber || "";


    chittiDate.value =
        member.chittiDate || "";


    chittiValue.value =
        member.chittiValue || 0;


    chittiMonth.value =
        member.chittiMonth || "";


    amountToPay.value =
        member.amountToPay || 0;


    nextAction.value =
        member.nextAction || "";


    signature.value =
        member.signature || "";


    renderPayments();


    calculateTotals();

}


// ==========================================
// SAVE CURRENT MEMBER
// ==========================================

function saveCurrentMember() {

    const member =
        getSelectedMember();


    if (!member) {

        return;

    }


    member.name =
        memberName.value.trim();


    member.phone =
        memberPhone.value.trim();


    member.chittiNumber =
        Number(
            chittiNumber.value
        ) || 0;


    member.chittiDate =
        chittiDate.value;


    member.chittiValue =
        Number(
            chittiValue.value
        ) || 0;


    member.chittiMonth =
        chittiMonth.value;


    member.amountToPay =
        Number(
            amountToPay.value
        ) || 0;


    member.nextAction =
        nextAction.value;


    member.signature =
        signature.value;


    member.chittiNumber =
        Number(
            chittiNumberTable.value
        ) || member.chittiNumber;

}


// ==========================================
// RENDER PAYMENT HISTORY
// ==========================================

function renderPayments() {

    paymentHistory.innerHTML = "";


    const member =
        getSelectedMember();


    if (!member) {

        return;

    }


    member.payments.forEach(
        function(payment, index) {


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <input
                        type="date"
                        class="payment-date"
                        value="${payment.date || ""}"
                        disabled
                    >

                </td>


                <td>

                    <input
                        type="number"
                        class="payment-amount"
                        value="${payment.amount || 0}"
                        disabled
                    >

                </td>


                <td>

                    <button
                        class="edit-payment"
                    >
                        ✏️
                    </button>


                    <button
                        class="delete-payment"
                    >
                        🗑️
                    </button>

                </td>

            `;


            const editButton =
                row.querySelector(
                    ".edit-payment"
                );


            const deleteButton =
                row.querySelector(
                    ".delete-payment"
                );


            const dateInput =
                row.querySelector(
                    ".payment-date"
                );


            const amountInput =
                row.querySelector(
                    ".payment-amount"
                );


            // EDIT

            editButton.addEventListener(
                "click",
                function() {


                    const editing =
                        amountInput.disabled;


                    if (editing) {

                        dateInput.disabled =
                            false;

                        amountInput.disabled =
                            false;

                        editButton.textContent =
                            "💾";

                        amountInput.focus();

                    } else {

                        dateInput.disabled =
                            true;

                        amountInput.disabled =
                            true;

                        editButton.textContent =
                            "✏️";


                        payment.date =
                            dateInput.value;


                        payment.amount =
                            Number(
                                amountInput.value
                            ) || 0;


                        saveData();

                        calculateTotals();

                    }

                }
            );


            // DELETE

            deleteButton.addEventListener(
                "click",
                function() {


                    const shouldDelete =
                        confirm(
                            "Delete this payment?"
                        );


                    if (!shouldDelete) {

                        return;

                    }


                    member.payments.splice(
                        index,
                        1
                    );


                    saveData();

                    renderPayments();

                    calculateTotals();

                }
            );


            paymentHistory.appendChild(
                row
            );

        }
    );

}


// ==========================================
// ADD PAYMENT
// ==========================================

addPayment.addEventListener(
    "click",
    function() {


        const member =
            getSelectedMember();


        if (!member) {

            alert(
                "Please select a member first."
            );

            return;

        }


        saveCurrentMember();


        member.payments.push({

            date:
                new Date()
                    .toISOString()
                    .split("T")[0],

            amount: 0

        });


        saveData();

        renderPayments();

        calculateTotals();

    }
);


// ==========================================
// CALCULATE TOTALS
// ==========================================

function calculateTotals() {

    const member =
        getSelectedMember();


    if (!member) {

        return;

    }


    let paid = 0;


    member.payments.forEach(
        function(payment) {

            paid +=
                Number(
                    payment.amount
                ) || 0;

        }
    );


    const amount =
        Number(
            amountToPay.value
        ) || 0;


    const balance =
        Math.max(
            amount - paid,
            0
        );


    displayPaid.value =
        paid;


    tableBalance.textContent =
        formatMoney(balance);


    totalAmountToPay.textContent =
        formatMoney(amount);


    totalPaid.textContent =
        formatMoney(paid);


    remainingBalance.textContent =
        formatMoney(balance);


    if (balance === 0 && amount > 0) {

        remainingBalance.classList.add(
            "zero"
        );

        tableBalance.style.color =
            "green";

    } else {

        remainingBalance.classList.remove(
            "zero"
        );

        tableBalance.style.color =
            "red";

    }

}


// ==========================================
// ADD MEMBER MODAL
// ==========================================

function openMemberModal() {

    memberModal.style.display =
        "flex";

}


function closeMemberModal() {

    memberModal.style.display =
        "none";

}


addMemberTop.addEventListener(
    "click",
    openMemberModal
);


addMemberBottom.addEventListener(
    "click",
    openMemberModal
);


cancelMember.addEventListener(
    "click",
    closeMemberModal
);


// ==========================================
// CREATE NEW MEMBER
// ==========================================

confirmMember.addEventListener(
    "click",
    function() {


        const number =
            Number(
                document.getElementById(
                    "newMemberNumber"
                ).value
            );


        const name =
            document.getElementById(
                "newMemberName"
            ).value.trim();


        const phone =
            document.getElementById(
                "newMemberPhone"
            ).value.trim();


        if (!name) {

            alert(
                "Please enter the member name."
            );

            return;

        }


        const newMember = {

            id:
                crypto.randomUUID(),

            number:
                number ||
                appData.members.length + 1,

            name:
                name,

            phone:
                phone,

            chittiNumber: 0,

            chittiDate: "",

            chittiValue: 0,

            chittiMonth: "",

            amountToPay: 0,

            payments: [],

            nextAction: "",

            signature: ""

        };


        appData.members.push(
            newMember
        );


        appData.selectedMemberId =
            newMember.id;


        saveData();

        renderMembers();

        loadSelectedMember();


        // Clear popup

        document.getElementById(
            "newMemberNumber"
        ).value = "";


        document.getElementById(
            "newMemberName"
        ).value = "";


        document.getElementById(
            "newMemberPhone"
        ).value = "";


        closeMemberModal();


        alert(
            name +
            " added successfully!"
        );

    }
);


// ==========================================
// SEARCH MEMBERS
// ==========================================

searchMember.addEventListener(
    "input",
    function() {

        renderMembers(
            searchMember.value
        );

    }
);


// ==========================================
// AUTO SAVE WHEN DETAILS CHANGE
// ==========================================

const editableFields = [

    memberName,

    memberPhone,

    chittiNumber,

    chittiNumberTable,

    chittiDate,

    chittiValue,

    chittiMonth,

    amountToPay,

    nextAction,

    signature

];


editableFields.forEach(
    function(field) {


        field.addEventListener(
            "input",
            function() {

                saveCurrentMember();

                saveData();

                calculateTotals();

            }
        );


        field.addEventListener(
            "change",
            function() {

                saveCurrentMember();

                saveData();

                calculateTotals();

            }
        );

    }
);


// ==========================================
// SAVE BUTTON
// ==========================================

saveButton.addEventListener(
    "click",
    function() {

        saveCurrentMember();

        saveData();

        renderMembers();

        alert(
            "All changes saved successfully! 💾"
        );

    }
);


// ==========================================
// START APPLICATION
// ==========================================

loadData();

renderMembers();

loadSelectedMember();
// ==========================================
// GENERATE CHITTI SLIP
// ==========================================

const generateSlip =
    document.getElementById("generateSlip");

const slipModal =
    document.getElementById("slipModal");

const closeSlip =
    document.getElementById("closeSlip");

const slipWhatsapp =
    document.getElementById("slipWhatsapp");


generateSlip.addEventListener(
    "click",
    function() {

        saveCurrentMember();

        saveData();

        const member =
            getSelectedMember();

        if (!member) {

            alert("Please select a member first.");

            return;

        }


        document.getElementById(
            "slipMemberName"
        ).textContent = member.name;


        document.getElementById(
            "slipPhone"
        ).textContent =
            member.phone || "-";


        document.getElementById(
            "slipChittiNo"
        ).textContent =
            member.chittiNumber || "-";


        document.getElementById(
            "slipValue"
        ).textContent =
            formatMoney(member.chittiValue);


        document.getElementById(
            "slipAmount"
        ).textContent =
            formatMoney(member.amountToPay);


        const paid =
            member.payments.reduce(
                function(total, payment) {

                    return total +
                        Number(payment.amount || 0);

                },
                0
            );


        const balance =
            Math.max(
                Number(member.amountToPay || 0) -
                paid,
                0
            );


        document.getElementById(
            "slipPaid"
        ).textContent =
            formatMoney(paid);


        document.getElementById(
            "slipBalance"
        ).textContent =
            formatMoney(balance);


        document.getElementById(
            "slipNextAction"
        ).textContent =
            member.nextAction || "";


        const slipPayments =
            document.getElementById(
                "slipPayments"
            );


        slipPayments.innerHTML = "";


        member.payments.forEach(
            function(payment) {

                const row =
                    document.createElement("div");

                row.className =
                    "slip-row";

                row.innerHTML = `
                    <span>
                        ${payment.date || "-"}
                    </span>

                    <span>
                        ${formatMoney(payment.amount)}
                    </span>
                `;

                slipPayments.appendChild(row);

            }
        );


        slipModal.style.display =
            "flex";

    }
);


closeSlip.addEventListener(
    "click",
    function() {

        slipModal.style.display =
            "none";

    }
);


// ==========================================
// WHATSAPP
// ==========================================

slipWhatsapp.addEventListener(
    "click",
    function() {

        const member =
            getSelectedMember();

        if (!member) {

            return;

        }


        const paid =
            member.payments.reduce(
                function(total, payment) {

                    return total +
                        Number(payment.amount || 0);

                },
                0
            );


        const balance =
            Math.max(
                Number(member.amountToPay || 0) -
                paid,
                0
            );


        const message =

`📒 CHITTI PAYMENT SLIP

👤 Member: ${member.name}

📱 Phone: ${member.phone || "-"}

🔢 Chitti No: ${member.chittiNumber || "-"}

💰 Chitti Value: ${formatMoney(member.chittiValue)}

💵 Amount to Pay: ${formatMoney(member.amountToPay)}

✅ Total Paid: ${formatMoney(paid)}

💳 Balance: ${formatMoney(balance)}

${member.nextAction || ""}

Thank you ❤️`;


        const phone =
            member.phone.replace(
                /\D/g,
                ""
            );


        const whatsappURL =
            phone

                ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

                : `https://wa.me/?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);
// ==========================================
// DOWNLOAD BEAUTIFUL SLIP
// ==========================================

const downloadSlip =
    document.getElementById("downloadSlip");

downloadSlip.addEventListener("click", function () {

    const slip =
        document.getElementById("chittiSlip");

    // Open the browser print window
    const printWindow =
        window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>

        <html>

        <head>

            <title>Chitti Payment Slip</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    background: white;
                    padding: 30px;
                }

                .chitti-slip {
                    width: 650px;
                    max-width: 90%;
                    margin: auto;

                    background: white;

                    padding: 35px;

                    border-radius: 15px;

                    border: 2px solid #e5e7eb;
                }

                .slip-header {
                    text-align: center;

                    padding-bottom: 20px;

                    border-bottom: 2px solid #2563eb;
                }

                .slip-header h1 {
                    color: #2563eb;
                }

                .slip-header p {
                    color: #666;
                }

                .slip-info {
                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    gap: 15px;

                    margin: 25px 0;
                }

                .slip-info div {
                    background: #f3f4f6;

                    padding: 13px;

                    border-radius: 8px;
                }

                .slip-info span {
                    display: block;

                    font-size: 12px;

                    color: #666;
                }

                .slip-info strong {
                    display: block;

                    margin-top: 5px;
                }

                .slip-row {
                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    padding: 12px;

                    border-bottom: 1px solid #ddd;
                }

                .slip-title {
                    background: #2563eb;

                    color: white;

                    font-weight: bold;
                }

                .slip-total {
                    margin-top: 25px;

                    padding: 15px;

                    background: #f3f4f6;

                    border-radius: 8px;
                }

                .slip-total p {
                    display: flex;

                    justify-content: space-between;

                    padding: 7px;
                }

                .slip-balance {
                    color: #dc2626;

                    font-size: 18px;
                }

                .slip-footer {
                    text-align: center;

                    margin-top: 25px;

                    color: #666;
                }

            </style>

        </head>


        <body>

            ${slip.outerHTML}

            <script>

                window.onload = function () {

                    window.print();

                };

            <\/script>

        </body>

        </html>
    `);

    printWindow.document.close();

});
document.addEventListener("DOMContentLoaded", () => {
  // Debt record
  const debt = {
    originalAmount: 1000,
    totalPaid: 1000,
    remainingBalance: 0,
    borrowedDate: "2026-07-29",
    status: "Settled"
  };

  // Element references
  const balanceElement = document.getElementById("remainingBalance");
  const originalElement = document.getElementById("originalAmount");
  const paidElement = document.getElementById("totalPaid");
  const progressElement = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const statusElement = document.getElementById("debtStatus");
  const borrowedDateElement = document.getElementById("borrowedDate");
  const daysElement = document.getElementById("daysSinceBorrowed");

  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Calculate payment progress
  const calculateProgress = () => {
    if (debt.originalAmount <= 0) return 100;

    return Math.min(
      100,
      Math.round((debt.totalPaid / debt.originalAmount) * 100)
    );
  };

  // Calculate days since borrowing
  const calculateDays = () => {
    const borrowedDate = new Date(
      `${debt.borrowedDate}T00:00:00`
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const difference = today - borrowedDate;

    return Math.max(
      0,
      Math.floor(difference / (1000 * 60 * 60 * 24))
    );
  };

  // Update debt information
  const updateDebtDisplay = () => {
    const progress = calculateProgress();

    if (balanceElement) {
      balanceElement.textContent = formatCurrency(
        debt.remainingBalance
      );
    }

    if (originalElement) {
      originalElement.textContent = formatCurrency(
        debt.originalAmount
      );
    }

    if (paidElement) {
      paidElement.textContent = formatCurrency(
        debt.totalPaid
      );
    }

    if (progressElement) {
      progressElement.style.width = `${progress}%`;
      progressElement.setAttribute(
        "aria-valuenow",
        progress
      );
    }

    if (progressText) {
      progressText.textContent = `${progress}% completed`;
    }

    if (statusElement) {
      statusElement.textContent = debt.status;
      statusElement.classList.add("settled");
    }

    if (borrowedDateElement) {
      const date = new Date(
        `${debt.borrowedDate}T00:00:00`
      );

      borrowedDateElement.textContent =
        date.toLocaleDateString("en-PH", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
    }

    if (daysElement) {
      daysElement.textContent = calculateDays();
    }
  };

  // Initialize page
  updateDebtDisplay();
});

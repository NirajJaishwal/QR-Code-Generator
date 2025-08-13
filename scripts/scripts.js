//   <!-- Load qr-code-styling library -->
//   <script src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
document.addEventListener("DOMContentLoaded", () => {
    const qrWrapper = document.getElementById("qr-wrapper");
    const qrcodeDiv = document.getElementById("qrcode");
    const dataInput = document.getElementById("data");
    const generateBtn = document.getElementById("generate");
    const downloadBtn = document.getElementById("download");
    const copyBtn = document.getElementById("copy");
    const clearBtn = document.getElementById("clear");
    const sizeSelect = document.getElementById("size");
    const ecSelect = document.getElementById("ec");
    const styleSelect = document.getElementById("style");
    const fgColor = document.getElementById("fg");
    const bgColor = document.getElementById("bg");
    const padVerticalInput = document.getElementById("padVertical");
    const padHorizontalInput = document.getElementById("padHorizontal");
    const status = document.getElementById("status");

    let qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: dataInput.value.trim(),
    dotsOptions: {
        color: fgColor.value,
        type: "square",
    },
    cornersSquareOptions: {
        type: "square",
        color: fgColor.value,
    },
    cornersDotOptions: {
        type: "square",
        color: fgColor.value,
    },
    backgroundOptions: {
        color: bgColor.value,
    },
    qrOptions: {
        errorCorrectionLevel: getCorrectionLevel(),
    },
    });

    qrCode.append(qrcodeDiv);

    function clearQRCode() {
    if (qrCode) {
        qrCode.clear();
    }
    qrcodeDiv.innerHTML = "";
    }

    // qr with error correction
    function getCorrectionLevel() {
    // qr-code-styling uses error correction string: 'L','M','Q','H'
    const val = ecSelect.value;
    if (["L", "M", "Q", "H"].includes(val)) return val;
    return "H";
    }

    // define three classic style for qr generation
    function getStyleOptions(styleName) {
    switch (styleName) {
        case "dots":
        return {
            type: "dots",
            // 'dots' style shapes
            dotStyle: "dots",
            // Optional rounding for dots shape
            // quietZoneColor handled by background
        };
        case "rounded":
        return {
            type: "rounded",
            dotStyle: "rounded",
        };
        case "classic":
        default:
        return {
            type: "square",
            dotStyle: "square",
        };
    }
    }

    // generate QR
    function generateQR() {
    const text = dataInput.value.trim();
    if (!text) {
        alert("Please enter a link or text to encode");
        return;
    }

    // Update qrCode instance
    qrCode.update({
        data: text,
        width: parseInt(sizeSelect.value),
        height: parseInt(sizeSelect.value),
        dotsOptions: {
        color: fgColor.value,
        type: getStyleOptions(styleSelect.value).type,
        },
        cornersSquareOptions: {
        type: getStyleOptions(styleSelect.value).type,
        color: fgColor.value,
        },
        cornersDotOptions: {
        type: getStyleOptions(styleSelect.value).type,
        color: fgColor.value,
        },
        backgroundOptions: {
        color: bgColor.value,
        },
        qrOptions: {
        errorCorrectionLevel: getCorrectionLevel(),
        },
    });

    // Update wrapper size and background for padding
    const qrSize = parseInt(sizeSelect.value);
    const padVertical = Math.max(0, parseInt(padVerticalInput.value));
    const padHorizontal = Math.max(0, parseInt(padHorizontalInput.value));
    qrWrapper.style.width = qrSize + (2* padHorizontal) + "px";
    qrWrapper.style.height = qrSize + (2 * padVertical) + "px";
    qrWrapper.style.backgroundColor = bgColor.value;

    status.textContent = "Ready";
    }

    generateBtn.addEventListener("click", generateQR);

    downloadBtn.addEventListener("click", () => {
    if (!qrCode) {
        alert("Please generate a QR code first");
        return;
    }
    qrCode.download({ extension: "png" });
    });

    copyBtn.addEventListener("click", async () => {
    const text = dataInput.value.trim();
    if (!text) {
        alert("Please enter text to copy");
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = original), 1500);
    } catch {
        alert("Copy failed — your browser may block clipboard access.");
    }
    });

    clearBtn.addEventListener("click", () => {
    dataInput.value = "";
    qrcodeDiv.innerHTML = "";
    clearQRCode();
    });
});


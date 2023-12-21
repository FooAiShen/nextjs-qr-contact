import React, { useEffect, useState, useRef } from "react";
import { XCircle } from "react-feather";
import QRCodeStyling from "qr-code-styling";
import YTLCementLogo from "../../../public/assets/YTL Cement Logo.jpg";

// ================= INTERFACES / TYPES
interface QrCodePopupProps {
  onClose: () => void;
}

const QrCodePopup: React.FC<QrCodePopupProps> = ({ onClose }) => {
  const generateQRCode = () => {
    const qrCode = new QRCodeStyling({
      width: 400,
      height: 400,
      image:
        "https://ytlwebsitestorage.blob.core.windows.net/ytl-media/ytl-media/assets/ytl_362fdc2efa.jpg?updated_at=2022-03-24T11:16:44.414Z",
      dotsOptions: {
        type: "rounded",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      cornersDotOptions: {
        type: "dot",
      },
    });

    qrCode.update({
      data: window.location.href,
    });

    return qrCode;
  };

  const qrcodeRef = useRef<HTMLDivElement | null>(null);
  const [qrCode, setQRCode] = useState(generateQRCode);

  useEffect(() => {
    if (qrcodeRef.current) {
      qrCode.append(qrcodeRef.current);
    }
  }, [qrCode]);

  // ================= VIEWS
  return (
    <div className="popup-overlay">
      {/* Container for popup content */}
      <div className="flex flex-col">
        {/* Close button (XCircle icon) */}
        <div
          className="place-self-end mb-3 cursor-pointer p-1 bg-white rounded-full"
          onClick={onClose}
        >
          <XCircle color="#4b5563" size={24} />
        </div>
        {/* Popup content */}
        <div className="popup-content">
          {/* QR code component */}
          <div ref={qrcodeRef} />
        </div>
      </div>
    </div>
  );
};

export default QrCodePopup;

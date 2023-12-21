import React, { useState } from "react";
import {
  XCircle,
  Mail,
  Phone,
  Smartphone,
  Briefcase,
  Linkedin,
} from "react-feather";

// ================= INTERFACES / TYPES
interface ConnectPopupProps {
  onClose: () => void;
  profile: ProfileInfo;
}
interface ProfileInfo {
  id: number;
  attributes: {
    slug: string;
    domain: string;
    countryCodeMobile: string;
    countryCodeOffice: string;
    mobileNumber: string;
    officeNumber: string;
    extensionNumber: string;
    linkedIn: string;
  };
}

// ================= COMPONENT
const ConnectPopup: React.FC<ConnectPopupProps> = ({ onClose, profile }) => {
  // ================= STATE
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // ================= EVENT HANDLERS
  const handleOptionChange = (option: string) => {
    // Set the selected option
    setSelectedOption(option);

    // Handle the connect action based on the selectedOption
    if (option === "whatsapp") {
      // Generate WhatsApp link
      const countryCode = getCountryCode(profile.attributes.countryCodeMobile);
      const whatsappLink = `https://api.whatsapp.com/send?phone=${countryCode}${profile.attributes.mobileNumber}`;
      // Redirect to WhatsApp link
      window.location.href = whatsappLink;
    } else if (option === "email") {
      // Generate mailto link
      const emailLink = `mailto:${profile.attributes.slug}${profile.attributes.domain}?subject=I%20would%20like%20to%20connect%20with%20you!`;
      // Redirect to mailto link
      window.location.href = emailLink;
    } else if (option === "phone") {
      // Generate tel link
      const telLink = `tel:${getCountryCode(
        profile.attributes.countryCodeMobile
      )}${profile.attributes.mobileNumber}`;
      // Redirect to tel link
      window.location.href = telLink;
    } else if (option === "office") {
      // Generate tel link for office number
      const officeTelLink = `tel:${getCountryCode(
        profile.attributes.countryCodeOffice
      )}${profile.attributes.officeNumber}ext${
        profile.attributes.extensionNumber
      }`;
      // Redirect to tel link
      window.location.href = officeTelLink;
    } else if (option === "linkedin") {
      // Generate tel link for office number
      const linkedInLink = `${profile.attributes.linkedIn}`;
      // Redirect to tel link
      window.location.href = linkedInLink;
    }

    // Close the popup
    onClose();
  };

  // ================= HELPER FUNCTION
  const getCountryCode = (countryName: string): string => {
    switch (countryName) {
      case "Malaysia (60)":
        return "60";
      case "Singapore (65)":
        return "65";
      case "Vietnam (84)":
        return "84";
      default:
        return countryName;
    }
  };

  const connectionOptions = [
    { value: "whatsapp", label: "WhatsApp", icon: <Smartphone /> },
    { value: "email", label: "Email", icon: <Mail /> },
    { value: "phone", label: "Phone", icon: <Phone /> },
    { value: "office", label: "Office", icon: <Briefcase /> },
    { value: "linkedin", label: "LinkedIn", icon: <Linkedin /> },
  ];

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
        <div className="popup-content w-80 sm:w-96">
          <h2 className="text-xl sm:text-2xl mb-5">Connect with</h2>
          <div className="grid grid-cols-3 gap-4">
            {connectionOptions.map((option) => (
              <button
                key={option.value}
                className={`flex flex-col items-center justify-center cursor-pointer pt-3 bg-white rounded-lg border shadow-sm ex1 ${
                  selectedOption === option.value
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleOptionChange(option.value)}
              >
                {option.icon}
                <span className="py-2 text-xs sm:text-sm text-gray-600">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPopup;

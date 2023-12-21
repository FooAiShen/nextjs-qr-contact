import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/global.css";
import {
  Share2,
  Send,
  Smartphone,
  Phone,
  Briefcase,
  MapPin,
} from "react-feather";
import QrCodePopup from "../components/QRCodePopup";
import ConnectPopup from "../components/ConnectPopup";
import ErrorStatus from "../components/ErrorStatus";
import clsx from "clsx";
import Image from "next/image";

// ================= INTERFACES / TYPES
interface ProfileInfo {
  id: number;
  attributes: {
    name: string;
    about: string;
    slug: string;
    domain: string;
    jobTitle: string;
    company: string;
    countryCodeMobile: string;
    countryCodeOffice: string;
    mobileNumber: string;
    officeNumber: string;
    extensionNumber: string;
    location: string;
    linkedIn: string;
    profilePhoto: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const Profile: React.FC = () => {
  // ================= STYLES
  const buttonClass = clsx(
    "w-full",
    "inline-flex",
    "items-center",
    "justify-center",
    "px-4",
    "py-2",
    "text-base",
    "sm:text-lg",
    "bg-white",
    "rounded-md",
    "shadow-sm"
  );

  // ================= STATE
  const [profiles, setProfiles] = useState<ProfileInfo[]>([]);
  const [isSharePopupVisible, setSharePopupVisibility] = useState(false);
  const [isConnectPopupVisible, setConnectPopupVisibility] = useState(false);

  // ================= EVENT HANDLERS
  const handleShareClick = () => {
    setSharePopupVisibility(!isSharePopupVisible);
  };

  const handleConnectClick = () => {
    setConnectPopupVisibility(!isConnectPopupVisible);
  };

  // ================= VARIABLES
  const { slug } = useParams();

  // ================= HOOKS
  useEffect(() => {
    // Set the content type of the request to JSON
    const headers = { "Content-Type": "application/json" };

    // // Fetch profiles data from the API
    // fetch("http://localhost:1337/api/profiles?populate=*", {
    //   // fetch(
    //   //   "https://qrcontact-strapi.uat4ytlcement.com/api/profiles?populate=*",
    //   //   {
    //   headers,
    //   method: "GET",
    // })
    //   .then((response) => response.json())
    //   .then(({ data }) => setProfiles(data))
    //   .catch((error) => console.error("Error fetching profiles:", error));

    fetch("http://localhost:1337/api/profiles?populate=*", {
      headers,
      method: "GET",
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setProfiles(data);
        console.log(JSON.stringify(data)); // Move this line inside the then block
      })
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);

  console.log("Current slug:", slug);

  // // Find the profile to display based on the slug parameter
  const profileToDisplay = profiles.find(
    (profile) => profile.attributes.slug === slug
  );
  // console.log("Current slug:", profiles?.attributes.slug);
  console.log("Current slug:", profileToDisplay);

  // Function to get the country code based on the country name
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

  // Function to format a Malaysian phone number
  const formatMalaysianPhoneNumber = (phoneNumber: string): string => {
    const isSpecialNumber = phoneNumber.startsWith("11");
    const isLandlineNumber = phoneNumber.startsWith("3");

    let segments: number[];

    if (isSpecialNumber) {
      segments = [2, 4, 4];
    } else if (isLandlineNumber) {
      segments = [1, 3, 4];
    } else {
      segments = [2, 3, 4];
    }

    let formattedNumber = "";
    let index = 0;

    segments.forEach((segment) => {
      formattedNumber += phoneNumber.slice(index, index + segment) + " ";
      index += segment;
    });

    return formattedNumber.trim(); // Remove trailing space
  };

  // Function to construct and download a vCard for the displayed profile
  const saveContact = () => {
    // Check if profileToDisplay is defined
    if (profileToDisplay) {
      // Construct vCard content **DO NOT INDENT**
      const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${profileToDisplay.attributes.name}
ORG:${profileToDisplay.attributes.company}
TEL;TYPE=CELL,VOICE:(${getCountryCode(
        profileToDisplay.attributes.countryCodeMobile
      )}) ${profileToDisplay.attributes.mobileNumber}
TEL;TYPE=WORK,VOICE:(${getCountryCode(
        profileToDisplay.attributes.countryCodeOffice
      )}) ${profileToDisplay.attributes.officeNumber} ext ${
        profileToDisplay.attributes.extensionNumber
      }
EMAIL:${profileToDisplay.attributes.slug}${profileToDisplay.attributes.domain}
END:VCARD`;

      // Convert vCard content to Blob
      const blob = new Blob([vCardContent], { type: "text/vcard" });

      // Create data URI for the Blob
      const dataUri = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = dataUri;
      link.download = "contact.vcf"; // Set the filename for the download

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click on the link to initiate the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    }
  };

  // Function to get the formatted URL
  const getURL = (url: string): string => {
    return url?.startsWith("/") ? "http://localhost:1337" + url : url;
    // return url?.startsWith("/")
    //   ? "https://qrcontact-strapi.uat4ytlcement.com" + url
    //   : url;
  };

  // ================= VIEWS
  return (
    <div>
      {/* Header */}
      <div className="bg-white p-5 flex items-center justify-between shadow-md fixed w-full top-0 z-10">
        <div className="flex items-center">
          <Image
            src="https://ytlwebsitestorage.blob.core.windows.net/ytl-media/ytl-media/assets/ytl_362fdc2efa.jpg?updated_at=2022-03-24T11:16:44.414Z"
            alt="Logo"
            width={140} // set the width of the image
            height={140} // set the height of the image
            className="h-14"
          />
        </div>
      </div>
      {profileToDisplay ? (
        <div className="min-h-screen sm:bg-gray-100 pb-10 pt-28 sm:pb-12 sm:pt-36 justify-center">
          <div className="relative min-h-full min-width max-w-screen md:max-w-2xl mx-4 sm:mx-10 md:m-auto sm:p-10 bg-white sm:shadow-lg sm:rounded-3xl">
            <div className="flex flex-col bg-gray-100 items-center rounded-3xl gap-5 p-5 mb-7">
              <div
                className="absolute top-6 right-5 sm:top-16 sm:right-16 cursor-pointer"
                onClick={handleShareClick}
              >
                <Share2 color="#4b5563" />
              </div>
              <img
                className="w-32 h-32 object-cover rounded-full shadow-md"
                src={getURL(
                  profileToDisplay.attributes.profilePhoto.data.attributes.url
                )}
                alt="Profile"
              />
              <div className="w-full divide-y divide-gray-300">
                <div className="flex flex-col items-center pb-5">
                  <h1 className="text-xl sm:text-2xl">
                    {profileToDisplay.attributes.name}
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600">
                    {profileToDisplay.attributes.jobTitle}
                  </p>
                  <p className="text-base sm:text-lg text-gray-600">
                    {profileToDisplay.attributes.company}
                  </p>
                </div>
                <div className="w-full flex gap-5 pt-5">
                  <button
                    className={`border border-color-sky text-color-sky ex1 ${buttonClass}`}
                    onClick={saveContact}
                  >
                    Save Contact
                  </button>
                  <button
                    className={`bg-color-sky text-white ex2 ${buttonClass}`}
                    onClick={handleConnectClick}
                  >
                    Connect
                  </button>

                  {isConnectPopupVisible && (
                    <ConnectPopup
                      onClose={handleConnectClick}
                      profile={profileToDisplay}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Popup */}
            {isSharePopupVisible && <QrCodePopup onClose={handleShareClick} />}
            {profileToDisplay.attributes.about && ( // Check if 'about' is not an empty string
              <>
                <div className="flex flex-col mx-5 mb-7">
                  <h2 className="text-xl sm:text-2xl mb-2">About</h2>
                  <p className="text-base sm:text-lg text-gray-600">
                    {profileToDisplay.attributes.about}
                  </p>
                </div>
              </>
            )}
            <div className="flex flex-col mx-5 divide-y divide-gray-300">
              {[
                {
                  icon: <Send color="#4b5563" />,
                  text: `${profileToDisplay.attributes.slug}${profileToDisplay.attributes.domain}`,
                },
                {
                  icon: <Smartphone color="#4b5563" />,
                  text: `(${getCountryCode(
                    profileToDisplay.attributes.countryCodeMobile
                  )}) ${formatMalaysianPhoneNumber(
                    profileToDisplay.attributes.mobileNumber
                  )}`,
                },
                {
                  icon: <Phone color="#4b5563" />,
                  text: profileToDisplay.attributes.officeNumber
                    ? `(${getCountryCode(
                        profileToDisplay.attributes.countryCodeOffice
                      )}) ${formatMalaysianPhoneNumber(
                        profileToDisplay.attributes.officeNumber
                      )} ext ${profileToDisplay.attributes.extensionNumber}`
                    : `(${getCountryCode(
                        profileToDisplay.attributes.countryCodeOffice
                      )}) ${profileToDisplay.attributes.extensionNumber}`,
                },
                {
                  icon: <Briefcase color="#4b5563" />,
                  text: profileToDisplay.attributes.company,
                },
                {
                  icon: <MapPin color="#4b5563" />,
                  text: profileToDisplay.attributes.location,
                },
              ]
                .filter((item) => item.text) // Filter out items with empty or falsy text values
                .map((item, index) => (
                  <div key={index} className="inline-flex">
                    <div className="pl-2 pr-4 self-center">{item.icon}</div>
                    <ul className="text-base sm:text-lg text-gray-600 py-3 truncate">
                      {item.text}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <ErrorStatus />
      )}
      {/* Footer */}
      <div className="bg-color-sky p-1"></div>
    </div>
  );
};

export default Profile;

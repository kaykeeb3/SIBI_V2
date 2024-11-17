import { Link } from "react-router-dom";
import whatsappIcon from "@/public/assets/whatsapp-icon.svg";

export function WhatsappButton() {
  return (
    <div className="fixed bottom-7 right-10 z-50">
      <Link to="/" className="hover:opacity-90">
        <img src={whatsappIcon} alt="whatsappIcon" className="h-14 p-1" />
      </Link>
    </div>
  );
}

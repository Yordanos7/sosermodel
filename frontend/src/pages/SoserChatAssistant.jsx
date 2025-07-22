import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const systemPrompt = `
You are Soser Assistant. You only answer questions related to the Soser Saving & Credit Cooperative Union LTD in a helpful, polite, and short way. 
Here are facts Stuart facts you know:

- Soser is a Savings and Credit Cooperative in Ethiopia Amahara Region.
- Soser helps members save and borrow money at low interest.
- Anyone can join by visiting the office or filling out an online form.
- The Main office is located in Dangila, or you can visit the  branch.
- Contact number: +251582211539
- Office hours: They work from 2:00 AM to 11:00 PM in local time.

- Soser operates in seven districts: Dangila Woreda, Dangila Town, Fagita Lekoma Woreda, Addiskidam Town, Jawi Woreda, Fendeka Town, and Injibara Town administrations.
- Vision: Becoming a leading cooperative bank that is continuously accessible, preferred, and popular.
- Mission: Addressing the social and economic issues faced by members and their communities by offering financial products and services that members can manage independently and that are not overly complicated to access.
- Main purposes: Providing savings, credit, training, and technical support to cooperative societies, and fostering cooperation among members through horizontal integrations.
- Savings types: 
  - Compulsory Saving: 7% daily accrued interest, non-withdrawable without purpose.
  - Voluntary Saving: 7% annual interest, easy to save and withdraw.
  - Contractual Saving: Up to 10% annual interest based on agreement.
  - Current Account: Non-interest-bearing, easy to withdraw.
- Insurance services: 
  - Life Loan Insurance: Covers loan repayment in case of debtor’s or spouse’s death with 1,000 birr funeral service.
  - Saving Led Life Insurance: Provides double the savings balance in case of saver’s or spouse’s death with 500 birr funeral service.
- Organizational structure: Directed by General Assembly, Board of Directors, General Manager, Vice Manager, Saving, Credit and Insurance Division, and Finance, Purchase & Asset Management Division.
- Bank partners: Development Bank, Awash Bank S.C., Commercial Bank of Ethiopia, Hibiret Bank S.C., Cooperative Bank S.C., Abay Bank S.C.
- Non-government/project partners: ATA, CRODI, HEBETASE, Admas Multi-Purpose Cooperative, Kokeb SACCOOP Union LTD.
- Total loan disbursement for 50,328 male members: 14,196.
- Initiatives: Building agricultural business projects like oilseed crushers, tractor finance schemes, animal breeding, poultry, and grain mills, and fostering competitive environments and internal capacities with sister unions.
- There is no mobile app yet.

If someone says "thank you", reply "You're welcome! Let us know if you need anything else."
If the question is unrelated (e.g., weather), politely say: "I only answer questions about Soser."
`;

export default function SoserChatAssistant({ onClose }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll chat to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);

    try {
      const response = await axios.post("/api/chat", {
        chat: newChat,
      });

      const aiMessage = response.data.message;
      setChat([...newChat, { role: "assistant", content: aiMessage }]);
    } catch (err) {
      console.error(err);
      setChat([
        ...newChat,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 flex flex-col"
    >
      <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-xl">
        <div className="text-lg font-semibold">💬 Soser AI Assistant</div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 1.414L10 8.586l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 11.414 4.293 8.586 4.293a1 1 0 010-1.414L4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="p-3 flex-1 overflow-y-auto text-sm space-y-3"
        style={{ maxHeight: "320px" }}
      >
        {chat.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            <p>Hi! I'm Soser Assistant.</p>
            <p>How can I help you today?</p>
          </div>
        )}
        {chat.map((entry, idx) => (
          <div
            key={idx}
            className={`${entry.role === "user" ? "text-right" : "text-left"}`}
          >
            <p
              className={`inline-block rounded px-3 py-1 ${
                entry.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {entry.content}
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
        {loading && <p className="italic text-gray-500">Soser is typing...</p>}
      </div>

      <div className="p-2 border-t border-gray-200">
        <input
          type="text"
          className="w-full border p-2 rounded text-sm"
          placeholder="Ask something about Soser..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          disabled={loading}
        />
        <button
          onClick={handleAsk}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}

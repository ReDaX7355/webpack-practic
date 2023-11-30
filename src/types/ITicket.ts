import Imessage from "./Imessage";


interface ITicket {
  id: string;
  ticket_number: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  closed_at: string;
  type_request: string;
  assigned_to: string;
  priority: string;
  completed: boolean;
  messages: Imessage[];
}

export default ITicket;

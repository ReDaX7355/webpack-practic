type messageType = {
  timestamp: string;
  author: string;
  visible_to: string;
  massage: string;
};

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
  messages: messageType[];
}

export default ITicket;

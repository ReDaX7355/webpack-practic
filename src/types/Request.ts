interface Request {
  id: number;
  title: string;
  description: string;
  applicant_id: number;
  create_date: string;
  completed_date: string;
  type_request: string;
  support_id: number;
  priority: string;
  completed: boolean;
}

export default Request;

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted')),
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing (optional)
INSERT INTO contact_submissions (first_name, last_name, email, phone, message, status) VALUES
('John', 'Doe', 'john.doe@example.com', '+65 9123 4567', 'Hi, I am interested in your marriage facilitation services. Could you please provide more information about your process and pricing?', 'new'),
('Sarah', 'Lim', 'sarah.lim@example.com', '+65 8765 4321', 'I have been looking for a professional matchmaking service and came across your website. I would like to schedule a consultation to discuss my requirements.', 'contacted'),
('Michael', 'Tan', 'michael.tan@example.com', '+65 9876 5432', 'Your success stories are very inspiring! I am ready to begin my journey to find my life partner. When can we meet?', 'converted');

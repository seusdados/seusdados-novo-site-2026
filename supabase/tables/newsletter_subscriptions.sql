CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    subscribed_at TIMESTAMP DEFAULT NOW(),
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    is_active BOOLEAN DEFAULT TRUE
);
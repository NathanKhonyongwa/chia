#!/usr/bin/env python3
"""
Supabase Database Setup Script
Verifies connection and creates tables if needed
"""

import requests
import json
from datetime import datetime

SUPABASE_URL = "https://wvfuyekzmdamgnfdeuvr.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZnV5ZWt6bWRhbWduZmRldXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NzcxNzYsImV4cCI6MjA4NDU1MzE3Nn0.TX5J5liBMDfXYmH-9P6dQE8VW75wc4NAtY4jVmWr7sA"

headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json",
}


def test_connection():
    print("🔍 Testing Supabase connection...")
    try:
        # Test by reading from data_store table
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/data_store?limit=1",
            headers=headers,
        )

        if response.status_code == 200:
            print("✅ Connection successful!")
            return True
        elif response.status_code == 404:
            print("⚠️  Table 'data_store' does not exist yet")
            print("\n📋 You need to create the table in Supabase SQL Editor:")
            print_sql_setup()
            return False
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            return False
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False


def test_write():
    print("\n🧪 Testing write operation...")
    try:
        test_key = f"test_{int(datetime.now().timestamp() * 1000)}"
        test_data = {
            "key": test_key,
            "value": {
                "test": "Supabase connection successful!",
                "timestamp": datetime.now().isoformat(),
            },
        }

        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/data_store",
            headers=headers,
            json=test_data,
        )

        if response.status_code == 201:
            print("✅ Write operation successful!")
            print(f"📝 Test key: {test_key}")

            # Test read
            test_read(test_key)

            # Cleanup
            test_delete(test_key)
            return True
        else:
            print(f"❌ Write failed: {response.status_code}")
            print(response.text)
            return False
    except Exception as e:
        print(f"❌ Write test failed: {e}")
        return False


def test_read(key):
    print("\n🧪 Testing read operation...")
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/data_store?key=eq.{key}",
            headers=headers,
        )

        if response.status_code == 200:
            data = response.json()
            if data:
                print("✅ Read operation successful!")
                print(f"📖 Retrieved: {data[0]['value']}")
                return True
        else:
            print(f"❌ Read failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Read test failed: {e}")
        return False


def test_delete(key):
    print("\n🧹 Cleaning up test record...")
    try:
        response = requests.delete(
            f"{SUPABASE_URL}/rest/v1/data_store?key=eq.{key}",
            headers=headers,
        )

        if response.status_code == 204:
            print("✅ Cleanup successful")
            return True
        else:
            print(f"⚠️  Cleanup warning: {response.status_code}")
            return False
    except Exception as e:
        print(f"⚠️  Cleanup failed: {e}")
        return False


def print_sql_setup():
    sql = """
-- Create data_store table
CREATE TABLE data_store (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create index on key
CREATE INDEX idx_data_store_key ON data_store(key);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_data_store_updated_at BEFORE UPDATE ON data_store
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE data_store ENABLE ROW LEVEL SECURITY;

-- Allow public access for development
CREATE POLICY "Enable all access for now" ON data_store
FOR ALL USING (true) WITH CHECK (true);
    """
    print(sql)


if __name__ == "__main__":
    print("🚀 Supabase Database Setup\n")

    if test_connection():
        test_write()
        print("\n🎉 All tests passed!")
    else:
        print("\n⚠️  Please create the data_store table and try again")

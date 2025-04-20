
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, User } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 container mx-auto px-4">
        <div className="max-w-2xl mx-auto py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.phone && (
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{user.phone}</p>
                </div>
              )}
              {user.age && (
                <div>
                  <p className="font-medium">Age</p>
                  <p className="text-muted-foreground">{user.age} years</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

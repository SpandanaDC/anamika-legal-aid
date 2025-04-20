
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ChevronLeft, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

const legalExperts = [
  {
    id: 1,
    name: 'Adv. Priya Sharma',
    specialization: 'Family Law Specialist',
    experience: '12 years',
    location: 'Delhi',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Adv. Rajesh Kumar',
    specialization: 'Corporate Law Expert',
    experience: '15 years',
    location: 'Mumbai',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Adv. Aisha Patel',
    specialization: 'Criminal Law Attorney',
    experience: '10 years',
    location: 'Bangalore',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    name: 'Adv. Vikram Singh',
    specialization: 'Property Law Expert',
    experience: '18 years',
    location: 'Chennai',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const ConnectWithExperts = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleExpertSelect = (expert: any) => {
    setSelectedExpert(expert);
    setIsDialogOpen(true);
    setAppointmentBooked(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    // In a real application, this would send the appointment data to a backend
    if (selectedDate && selectedTime) {
      setAppointmentBooked(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header */}
        <section className="gradient-bg text-white py-12 px-4">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              className="mb-4 text-white hover:bg-white/20"
              onClick={() => navigate('/home')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Connect with Legal Experts
            </h1>
            <p className="text-xl max-w-3xl">
              Schedule consultations with experienced legal professionals who can provide guidance for your specific legal needs.
            </p>
          </div>
        </section>
        
        {/* Expert Listings */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {legalExperts.map((expert) => (
                <Card key={expert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={expert.imageUrl} 
                      alt={expert.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2">{expert.name}</h3>
                    <p className="text-kanoon-medium-purple font-medium mb-1">{expert.specialization}</p>
                    <p className="text-gray-600 mb-1">Experience: {expert.experience}</p>
                    <div className="flex items-center mb-4">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{expert.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-medium">{expert.rating}/5</span>
                      </div>
                      <Button 
                        className="btn-gradient text-white"
                        onClick={() => handleExpertSelect(expert)}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {appointmentBooked ? 'Appointment Confirmed' : 'Schedule an Appointment'}
            </DialogTitle>
            {!appointmentBooked && selectedExpert && (
              <DialogDescription>
                Book a consultation with {selectedExpert.name}, {selectedExpert.specialization}
              </DialogDescription>
            )}
          </DialogHeader>
          
          {appointmentBooked ? (
            <div className="p-6 bg-green-50 rounded-lg text-center space-y-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Appointment Booked Successfully</h3>
              <div className="space-y-2 text-left">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{selectedDate?.toDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{selectedTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{selectedExpert?.location} Office</span>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                You will receive a confirmation email with additional details.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-4 font-medium">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => 
                      date < new Date() || 
                      date.getDay() === 0 || 
                      date.getDay() === 6
                    }
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <h3 className="mb-4 font-medium">Select Time</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-kanoon-medium-purple" : ""}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-gradient text-white"
                >
                  Confirm Booking
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ConnectWithExperts;

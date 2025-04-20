
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Plus, Trash2, Edit, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
  isEditing?: boolean;
}

const Notes = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('legalNotes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          date: new Date(note.date)
        }));
        setNotes(parsedNotes);
      } catch (e) {
        console.error('Error parsing notes from localStorage', e);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('legalNotes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.title.trim() === '' || newNote.content.trim() === '') {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      date: new Date()
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '' });
    setIsAddingNote(false);
    
    toast({
      title: "Success",
      description: "Note added successfully",
    });
  };

  const toggleEditNote = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isEditing: !note.isEditing } : note
    ));
  };

  const updateNote = (id: string, updatedTitle: string, updatedContent: string) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title: updatedTitle, content: updatedContent, isEditing: false } 
        : note
    ));
    toast({
      title: "Success",
      description: "Note updated successfully",
    });
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Success",
      description: "Note deleted successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 container mx-auto px-4">
        <div className="py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif font-bold gradient-text">Your Notes</h1>
            <Button 
              className="btn-gradient text-white"
              onClick={() => setIsAddingNote(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </div>
          
          {isAddingNote && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Note Title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Note Content"
                      className="min-h-[120px]"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsAddingNote(false);
                        setNewNote({ title: '', content: '' });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="btn-gradient text-white"
                      onClick={handleAddNote}
                    >
                      Save Note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {notes.length === 0 && !isAddingNote ? (
            <div className="text-center py-12">
              <div className="mb-4 text-gray-400">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No notes yet</h3>
              <p className="mt-1 text-gray-500">
                Get started by creating a new note
              </p>
              <div className="mt-6">
                <Button
                  className="btn-gradient text-white"
                  onClick={() => setIsAddingNote(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Note
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <Card key={note.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {note.isEditing ? (
                      <div className="space-y-4">
                        <Input
                          defaultValue={note.title}
                          id={`title-${note.id}`}
                          className="font-medium text-lg"
                        />
                        <Textarea
                          defaultValue={note.content}
                          id={`content-${note.id}`}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleEditNote(note.id)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="btn-gradient text-white"
                            size="sm"
                            onClick={() => {
                              const titleElement = document.getElementById(`title-${note.id}`) as HTMLInputElement;
                              const contentElement = document.getElementById(`content-${note.id}`) as HTMLTextAreaElement;
                              updateNote(note.id, titleElement.value, contentElement.value);
                            }}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-lg line-clamp-1">{note.title}</h3>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleEditNote(note.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => deleteNote(note.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-600 line-clamp-4 mb-3">{note.content}</p>
                        <p className="text-xs text-gray-400">
                          {note.date.toLocaleDateString()} at {note.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notes;

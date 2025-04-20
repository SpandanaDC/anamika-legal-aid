
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EducateYourself = () => {
  const { isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const legalTopics = [
    {
      id: 'fundamental-rights',
      title: 'Fundamental Rights',
      description: 'Learn about the basic rights guaranteed by the Indian Constitution.',
      content: 'The Constitution of India guarantees fundamental rights to all citizens. These include the right to equality, right to freedom, right against exploitation, right to freedom of religion, cultural and educational rights, and the right to constitutional remedies.',
      quiz: [
        { question: 'Which article of the Indian Constitution abolishes untouchability?', options: ['Article 14', 'Article 15', 'Article 17', 'Article 21'], answer: 'Article 17' },
        { question: 'Right to Education is guaranteed under which article?', options: ['Article 19', 'Article 21A', 'Article 25', 'Article 32'], answer: 'Article 21A' },
      ]
    },
    {
      id: 'womens-rights',
      title: 'Women\'s Rights',
      description: 'Understand the legal protections available for women in India.',
      content: 'Indian law provides several protections for women, including the Protection of Women from Domestic Violence Act, Sexual Harassment of Women at Workplace Act, and provisions in the Indian Penal Code against crimes targeting women.',
      quiz: [
        { question: 'Which act deals with workplace sexual harassment?', options: ['Vishaka Guidelines', 'POSH Act, 2013', 'Domestic Violence Act', 'Maternity Benefit Act'], answer: 'POSH Act, 2013' },
        { question: 'What is the minimum punishment for rape under Section 376 IPC?', options: ['5 years', '7 years', '10 years', 'Life imprisonment'], answer: '7 years' },
      ]
    },
    {
      id: 'consumer-protection',
      title: 'Consumer Protection',
      description: 'Know your rights as a consumer and how to address grievances.',
      content: 'The Consumer Protection Act, 2019 provides for the protection of consumer interests, establishment of consumer dispute redressal commissions, and regulation of matters related to consumer protection.',
      quiz: [
        { question: 'The Consumer Protection Act was revised in which year?', options: ['2015', '2017', '2019', '2021'], answer: '2019' },
        { question: 'What is the time limit for filing a complaint in a consumer forum?', options: ['6 months', '1 year', '2 years', 'No time limit'], answer: '2 years' },
      ]
    },
    {
      id: 'cyber-law',
      title: 'Cyber Law',
      description: 'Understanding digital rights and cyber crimes in India.',
      content: 'The Information Technology Act, 2000 (amended in 2008) deals with cybercrime and electronic commerce in India. It addresses issues like unauthorized access, data theft, privacy violations, and online fraud.',
      quiz: [
        { question: 'Which act primarily governs cyber crimes in India?', options: ['IPC', 'IT Act, 2000', 'Evidence Act', 'CrPC'], answer: 'IT Act, 2000' },
        { question: 'What is the punishment for identity theft under the IT Act?', options: ['1 year', '3 years', '5 years', '7 years'], answer: '3 years' },
      ]
    },
    {
      id: 'criminal-civil-laws',
      title: 'Criminal and Civil Laws',
      description: 'Learn the basics of criminal and civil legal procedures.',
      content: 'Criminal law deals with offenses against the public and is governed primarily by the Indian Penal Code, Code of Criminal Procedure, and Evidence Act. Civil law deals with disputes between individuals or organizations and includes areas like property law, contract law, and family law.',
      quiz: [
        { question: 'Which code defines criminal offenses in India?', options: ['CrPC', 'IPC', 'Evidence Act', 'Civil Procedure Code'], answer: 'IPC' },
        { question: 'In which court is a civil suit typically filed?', options: ['District Court', 'High Court', 'Sessions Court', 'Supreme Court'], answer: 'District Court' },
      ]
    },
  ];

  const [activeQuiz, setActiveQuiz] = React.useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = React.useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = React.useState<{[key: string]: boolean}>({});

  const handleStartQuiz = (topicId: string) => {
    setActiveQuiz(topicId);
    setQuizSubmitted({...quizSubmitted, [topicId]: false});
    setQuizAnswers({});
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers({...quizAnswers, [questionIndex]: answer});
  };

  const handleSubmitQuiz = (topicId: string, quiz: any[]) => {
    setQuizSubmitted({...quizSubmitted, [topicId]: true});
    // Calculate score logic would go here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header with Back Button */}
        <section className="gradient-bg text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                asChild
              >
                <Link to="/home">
                  <ArrowLeft className="h-6 w-6" />
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-serif font-bold">
                {translate('educateYourself')}
              </h1>
            </div>
            <p className="text-xl max-w-3xl">
              Expand your legal knowledge with our educational resources. Learn about different aspects of Indian law through interactive content.
            </p>
          </div>
        </section>
        
        {/* Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue={legalTopics[0].id} className="space-y-8">
              <TabsList className="flex flex-wrap justify-center gap-2">
                {legalTopics.map(topic => (
                  <TabsTrigger key={topic.id} value={topic.id}>
                    {topic.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {legalTopics.map(topic => (
                <TabsContent key={topic.id} value={topic.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p>{topic.content}</p>
                      </div>
                      
                      {activeQuiz === topic.id ? (
                        <div className="mt-8 space-y-6">
                          <h3 className="text-xl font-medium">Quiz: {topic.title}</h3>
                          
                          {quizSubmitted[topic.id] ? (
                            <div className="bg-green-50 p-4 rounded-md">
                              <h4 className="text-green-800 font-medium">Quiz Completed!</h4>
                              <p className="text-green-700">Thank you for taking the quiz.</p>
                              <Button 
                                variant="outline" 
                                className="mt-4"
                                onClick={() => setActiveQuiz(null)}
                              >
                                Return to Content
                              </Button>
                            </div>
                          ) : (
                            <>
                              {topic.quiz.map((q, idx) => (
                                <div key={idx} className="space-y-3">
                                  <h4 className="font-medium">Question {idx + 1}: {q.question}</h4>
                                  <div className="space-y-2">
                                    {q.options.map((option, optIdx) => (
                                      <div key={optIdx} className="flex items-center">
                                        <input
                                          type="radio"
                                          id={`q${idx}-opt${optIdx}`}
                                          name={`question-${idx}`}
                                          value={option}
                                          checked={quizAnswers[idx] === option}
                                          onChange={() => handleQuizAnswer(idx, option)}
                                          className="mr-2"
                                        />
                                        <label htmlFor={`q${idx}-opt${optIdx}`}>{option}</label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              
                              <Button 
                                className="btn-gradient text-white mt-4"
                                onClick={() => handleSubmitQuiz(topic.id, topic.quiz)}
                              >
                                Submit Quiz
                              </Button>
                            </>
                          )}
                        </div>
                      ) : (
                        <Button 
                          className="btn-gradient text-white mt-6"
                          onClick={() => handleStartQuiz(topic.id)}
                        >
                          Take Quiz
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EducateYourself;

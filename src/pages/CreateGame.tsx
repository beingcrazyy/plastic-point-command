import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Puzzle, 
  HelpCircle, 
  MemoryStick, 
  Upload, 
  Plus, 
  Trash, 
  Save,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

type GameType = "quiz" | "puzzle" | "trivia" | "memory";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function CreateGame() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [gameType, setGameType] = useState<GameType>("quiz");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "", options: ["", ""], correctAnswer: 0 }
  ]);
  const [difficulty, setDifficulty] = useState("easy");
  const [pieceCount, setPieceCount] = useState(12);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const audioUploadRef = useRef<HTMLInputElement>(null);

  const gameTypes = [
    { id: "quiz", label: "Quiz", icon: Brain, description: "Question & answer format" },
    { id: "puzzle", label: "Puzzle", icon: Puzzle, description: "Jigsaw puzzle games" },
    { id: "trivia", label: "Trivia", icon: HelpCircle, description: "Fun fact challenges" },
    { id: "memory", label: "Memory", icon: MemoryStick, description: "Memory matching games" }
  ];

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      options: ["", ""],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, options: [...q.options, ""] } : q
    ));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? 
        { ...q, options: q.options.filter((_, i) => i !== optionIndex) } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? 
        { ...q, options: q.options.map((opt, i) => i === optionIndex ? value : opt) } : q
    ));
  };

  const handleFileUpload = (type: 'image' | 'audio', files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} ${type}(s) uploaded successfully`);
    }
  };

  const handleSaveDraft = () => {
    toast.success("Game saved as draft");
    navigate("/games");
  };

  const handleNext = () => {
    if (!title.trim()) {
      toast.error("Please enter a game title");
      return;
    }
    navigate(`/games/${id || 'new'}/rewards`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? "Edit Game" : "Create New Game"}
            </h1>
            <p className="text-muted-foreground mt-2">Design engaging gamification content</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/games")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        {/* Game Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Game Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {gameTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setGameType(type.id as GameType)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      gameType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${
                      gameType === type.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <h3 className="font-medium text-sm">{type.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Game Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter game title..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your game..."
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Asset Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Images</Label>
                <div 
                  onClick={() => imageUploadRef.current?.click()}
                  className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                </div>
                <input
                  ref={imageUploadRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload('image', e.target.files)}
                  className="hidden"
                />
              </div>
              <div>
                <Label>Audio</Label>
                <div 
                  onClick={() => audioUploadRef.current?.click()}
                  className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload audio</p>
                </div>
                <input
                  ref={audioUploadRef}
                  type="file"
                  accept="audio/*"
                  multiple
                  onChange={(e) => handleFileUpload('audio', e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <Label>Uploaded Files</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <Badge key={index} variant="secondary">
                      {file.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Game Type Specific Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Game Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={gameType} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="puzzle">Puzzle</TabsTrigger>
                <TabsTrigger value="trivia">Trivia</TabsTrigger>
                <TabsTrigger value="memory">Memory</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quiz" className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Questions</h3>
                  <Button onClick={addQuestion} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>
                {questions.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <Label>Question {qIndex + 1}</Label>
                      {questions.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeQuestion(question.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={question.text}
                      onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                      placeholder="Enter question text..."
                    />
                    <div className="space-y-2">
                      <Label>Options</Label>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === optIndex}
                            onChange={() => updateQuestion(question.id, "correctAnswer", optIndex)}
                            className="mt-1"
                          />
                          <Input
                            value={option}
                            onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                            placeholder={`Option ${optIndex + 1}...`}
                            className="flex-1"
                          />
                          {question.options.length > 2 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(question.id, optIndex)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="puzzle" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pieces">Number of Pieces</Label>
                    <Select value={pieceCount.toString()} onValueChange={(v) => setPieceCount(parseInt(v))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 pieces</SelectItem>
                        <SelectItem value="12">12 pieces</SelectItem>
                        <SelectItem value="20">20 pieces</SelectItem>
                        <SelectItem value="30">30 pieces</SelectItem>
                        <SelectItem value="48">48 pieces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trivia" className="space-y-4 mt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4" />
                  <p>Trivia games use the same question format as quizzes.</p>
                  <p className="text-sm mt-2">Configure questions in the Quiz tab above.</p>
                </div>
              </TabsContent>

              <TabsContent value="memory" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="memory-difficulty">Difficulty Level</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy (4x4 grid)</SelectItem>
                        <SelectItem value="medium">Medium (6x6 grid)</SelectItem>
                        <SelectItem value="hard">Hard (8x8 grid)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Card Pairs</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {difficulty === "easy" ? "8 pairs" : difficulty === "medium" ? "18 pairs" : "32 pairs"}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={handleNext}>
            Next: Rewards & Schedule
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
export let data = [
  {
    _id: "66ee826f3f0ee4f1f75b3510",
    name: "Selection Sort",
    condition: "",
    theory:
      "Sắp xếp nổi bọt (tiếng Anh: bubble sort) là một thuật toán sắp xếp đơn giản, với thao tác cơ bản là so sánh hai phần tử kề nhau, nếu chúng chưa đứng đúng thứ tự thì đổi chỗ (swap). Có thể tiến hành từ trên xuống (bên trái sang) hoặc từ dưới lên (bên phải sang).",
    exercises: [
      {
        _id: {
          $numberInt: "1",
        },
        type: "code",
        question: "Đề bài",
        output: "abc xyz",
      },
      {
        _id: {
          $numberInt: "2",
        },
        type: "quiz",
        question: "Đề bài",
        answer1: "abc1",
        answer2: "abc2",
        answer3: "abc3",
        answer4: "abc4",
        correctAnswer: {
          $numberInt: "1",
        },
      },
    ],
    source: "SelectionSort",
    image: "../assets/images/selection-sort.png",
    subjectID: "670dffc293f9933bc2085181",
  },
  {
    _id: "66eed49528e79da139aecb75",
    name: "Insertion Sort",
    image: "../assets/images/insertion-sort.png",
    condition: "",
    theory:
      "Sắp xếp nổi bọt (tiếng Anh: bubble sort) là một thuật toán sắp xếp đơn giản, với thao tác cơ bản là so sánh hai phần tử kề nhau, nếu chúng chưa đứng đúng thứ tự thì đổi chỗ (swap). Có thể tiến hành từ trên xuống (bên trái sang) hoặc từ dưới lên (bên phải sang).",
    exercises: [
      {
        _id: {
          $numberInt: "1",
        },
        type: "code",
        question: "Đề bài",
        output: "abc xyz",
      },
      {
        _id: {
          $numberInt: "2",
        },
        type: "quiz",
        question: "Đề bài",
        answer1: "abc1",
        answer2: "abc2",
        answer3: "abc3",
        answer4: "abc4",
        correctAnswer: {
          $numberInt: "1",
        },
      },
    ],
    source: "InsertionSort",
    subjectID: "670dffc293f9933bc2085181",
  },
  {
    _id: "6709d92798484ac79905ff1e",
    name: "Bubble Sort",
    condition: "",
    theory:
      "Sắp xếp nổi bọt (tiếng Anh: bubble sort) là một thuật toán sắp xếp đơn giản, với thao tác cơ bản là so sánh hai phần tử kề nhau, nếu chúng chưa đứng đúng thứ tự thì đổi chỗ (swap). Có thể tiến hành từ trên xuống (bên trái sang) hoặc từ dưới lên (bên phải sang).",
    exercises: [
      {
        _id: {
          $numberInt: "1",
        },
        type: "code",
        question:
          "Viết hàm bubbleSort(arr) để sắp xếp một mảng số nguyên theo thứ tự tăng dần sử dụng thuật toán sắp xếp nổi bọt.",
        output: "[1,5,7,8,9]",
        input: "Mảng [9,1,5,7,8]",
        defaultLanguage: "csharp",
      },
      {
        _id: {
          $numberInt: "2",
        },
        type: "code",
        question:
          "Viết hàm bubbleSortDescending(arr) để sắp xếp một mảng số nguyên theo thứ tự giảm dần sử dụng thuật toán sắp xếp nổi bọt.",
        output: "",
      },
      {
        _id: {
          $numberInt: "3",
        },
        type: "single",
        question:
          "Thuật toán sắp xếp nổi bọt có độ phức tạp thời gian trung bình là gì?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        correctAnswer: [
          {
            $numberInt: "2",
          },
        ],
      },
      {
        _id: {
          $numberInt: "4",
        },
        type: "single",
        question:
          "Trong trường hợp nào thuật toán sắp xếp nổi bọt có hiệu suất tốt nhất?",
        options: [
          "Mảng đã được sắp xếp",
          "Mảng được sắp xếp ngược",
          "Mảng có các phần tử ngẫu nhiên",
          "Mảng có các phần tử giống nhau",
        ],
        correctAnswer: [
          {
            $numberInt: "0",
          },
        ],
      },
      {
        _id: {
          $numberInt: "5",
        },
        type: "single",
        question: "Thuật toán sắp xếp nổi bọt là thuật toán sắp xếp nào?",
        options: [
          "Sắp xếp ổn định",
          "Sắp xếp không ổn định",
          "Sắp xếp tại chỗ",
          "Sắp xếp không tại chỗ",
        ],
        correctAnswer: [
          {
            $numberInt: "0",
          },
        ],
      },
      {
        _id: {
          $numberInt: "6",
        },
        type: "multiple",
        question: "Chọn các đặc điểm đúng của thuật toán sắp xếp nổi bọt:",
        options: [
          "Dễ hiểu và dễ triển khai",
          "Hiệu quả với các tập dữ liệu lớn",
          "Sử dụng ít bộ nhớ phụ trợ",
          "Thường được sử dụng trong các ứng dụng thực tế",
        ],
        correctAnswer: [
          {
            $numberInt: "0",
          },
          {
            $numberInt: "2",
          },
        ],
      },
      {
        _id: {
          $numberInt: "7",
        },
        type: "single",
        question:
          "Trong một lần duyệt của thuật toán sắp xếp nổi bọt, điều gì xảy ra?",
        options: [
          "Phần tử nhỏ nhất được đưa về đầu mảng",
          "Phần tử lớn nhất được đưa về cuối mảng",
          "Tất cả các phần tử được sắp xếp",
          "Các phần tử được chia thành hai nhóm",
        ],
        correctAnswer: [
          {
            $numberInt: "1",
          },
        ],
      },
      {
        _id: {
          $numberInt: "8",
        },
        type: "single",
        question:
          "Số lần so sánh tối đa trong thuật toán sắp xếp nổi bọt cho một mảng có n phần tử là bao nhiêu?",
        options: ["n", "n-1", "n(n-1)/2", "n^2"],
        correctAnswer: [
          {
            $numberInt: "2",
          },
        ],
      },
      {
        _id: {
          $numberInt: "9",
        },
        type: "multiple",
        question:
          "Thuật toán sắp xếp nổi bọt có thể được cải tiến bằng cách nào?",
        options: [
          "Sử dụng cờ để kiểm tra xem có hoán đổi nào xảy ra trong một lần duyệt",
          "Sử dụng đệ quy thay vì vòng lặp",
          "Giảm số lần duyệt qua mảng trong mỗi lần lặp",
          "Sử dụng kỹ thuật chia để trị",
        ],
        correctAnswer: [
          {
            $numberInt: "0",
          },
          {
            $numberInt: "2",
          },
        ],
      },
      {
        _id: {
          $numberInt: "10",
        },
        type: "single",
        question:
          "Trong trường hợp xấu nhất, thuật toán sắp xếp nổi bọt cần bao nhiêu lần duyệt qua mảng để hoàn thành việc sắp xếp?",
        options: ["log n", "n", "n-1", "n^2"],
        correctAnswer: [
          {
            $numberInt: "2",
          },
        ],
      },
      {
        _id: {
          $numberInt: "11",
        },
        type: "single",
        question:
          "Thuật toán sắp xếp nổi bọt thường được sử dụng trong trường hợp nào?",
        options: [
          "Khi cần sắp xếp một lượng lớn dữ liệu",
          "Khi cần một thuật toán sắp xếp đơn giản để giảng dạy",
          "Khi cần sắp xếp nhanh nhất có thể",
          "Khi cần tiết kiệm bộ nhớ tối đa",
        ],
        correctAnswer: [
          {
            $numberInt: "1",
          },
        ],
      },
      {
        _id: {
          $numberInt: "12",
        },
        type: "multiple",
        question: "Chọn các phát biểu đúng về thuật toán sắp xếp nổi bọt:",
        options: [
          "Nó có thể được sử dụng để sắp xếp các phần tử theo thứ tự tăng dần hoặc giảm dần",
          "Nó luôn cần n-1 lần duyệt qua mảng để hoàn thành việc sắp xếp",
          "Nó có thể được tối ưu hóa để dừng sớm nếu mảng đã được sắp xếp",
          "Nó không thể sử dụng để sắp xếp các kiểu dữ liệu phức tạp",
        ],
        correctAnswer: [
          {
            $numberInt: "0",
          },
          {
            $numberInt: "2",
          },
        ],
      },
    ],
    source: "BubbleSort",
    image: "../assets/images/bubble-sort.png",
    subjectID: "670dffc293f9933bc2085181",
  },
];
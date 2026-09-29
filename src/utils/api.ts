import { Curso } from "@/types/curso";
import axios from "axios";
import {
    mockHomeSummary,
    mockHomeRankingBest,
    mockHomeRankingAtRisk,
    mockHomeIndicators,
    mockSubjects,
    mockCourses,
    mockCourseSummary,
    mockCourseIndicators,
    mockCourseGraphs,
    mockCourseRankingBest,
    mockCourseRankingAtRisk,
    mockStudents,
    mockStudentIndicators,
    mockStudentSummary,
    mockStudentGrades,
    mockStudentCognitive,
    mockStudentPerformance,
    mockStudentMotivation,
    mockTutorsSummary,
    mockTutorsIndicators,
    mockTutorsRankingBest,
    mockTutorsRankingAtRisk,
    mockTutorCourseSummary,
    mockTutorCourseIndicators,
    mockTutorInteractionChannels,
    mockTutorCourseRankingBest,
    mockTutorCourseRankingAtRisk,
    mockTutorDetailIndicators,
    mockTutorDetailAccess,
    mockTutorDetailForums,
    mockTutorDetailFeedback,
    mockTutorDetailGraphs,
    mockTutorResponseForums,
    mockTutorAccess,
    mockTutorFeedback,
    mockAdminUsers,
    mockSchedulerStatus,
    mockMoodleConfig,
    mockChatbotConversations,
    mockChatbotConversation,
    mockChatbotResponse,
} from "@/demo/mockData";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const api = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
        "Accept": "application/json"
    }
});

if (DEMO_MODE) {
    api.interceptors.request.use(async (config) => {
        const url = config.url || "";

        if (url.includes("/chatbot") && config.method === "post") {
            config.adapter = async () => ({
                data: mockChatbotResponse,
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("/chatbot/conversations/") && config.method === "get") {
            config.adapter = async () => ({
                data: {
                    conversation: mockChatbotConversation,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("/chatbot/conversations") && !url.includes("/chatbot/conversations/") && config.method === "get") {
            config.adapter = async () => ({
                data: {
                    conversations: mockChatbotConversations,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/general/summary")) {
            config.adapter = async () => ({
                data: {
                    data: mockHomeSummary,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/general/rankings")) {
            const isBestPerformance = url.includes("best-performance");

            config.adapter = async () => ({
                data: {
                    data: {
                        ranking: isBestPerformance
                            ? mockHomeRankingBest
                            : mockHomeRankingAtRisk,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/general/indicators")) {
            config.adapter = async () => ({
                data: {
                    data: mockHomeIndicators,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/general/subjects/indicators")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        subjects: mockSubjects,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("/subjects/tutors")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        subjects: mockCourses,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/summary")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        metrics: mockCourseSummary,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/indicators")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        subject: mockCourseIndicators,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/info_graphs")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        subject: mockCourseGraphs,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/rankings")) {
            const isBestPerformance = url.includes("best-performance");

            config.adapter = async () => ({
                data: {
                    data: {
                        ranking: isBestPerformance
                            ? mockCourseRankingBest
                            : mockCourseRankingAtRisk,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/students/engagement")) {
            config.adapter = async () => ({
                data: {
                    data: mockStudents,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }


        if (url.includes("analysis/subject/") && url.includes("/students/motivation")) {
            config.adapter = async () => ({
                data: {
                    data: mockStudents.map((student) => ({
                        ...student,
                        num_posts_unrequired: student.num_posts_unrequired ?? 5,
                        posts_unrequired_label: student.motivation_label ?? "médio",
                    })),
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/students/performance")) {
            config.adapter = async () => ({
                data: {
                    data: mockStudents.map((student) => ({
                        ...student,
                        media_percentual: student.media_percentual ?? 78,
                        comparative: student.comparative ?? 5,
                        performance_label: student.performance_label ?? "médio",
                        situation: "Aprovado",
                    })),
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/students/cognitive")) {
            config.adapter = async () => ({
                data: {
                    data: mockStudents.map((student) => ({
                        ...student,
                        forum_mean_level: student.forum_mean_level ?? 3.2,
                        quiz_mean_level: student.quiz_mean_level ?? 3.0,
                        assign_mean_level: student.assign_mean_level ?? 3.1,
                        label: student.cognitive_label ?? "médio",
                    })),
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/students/give_up")) {
            config.adapter = async () => ({
                data: {
                    data: mockStudents.map((student) => ({
                        ...student,
                        give_up: student.give_up ?? false,
                    })),
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/student/") && url.includes("/summary")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        student_summary: mockStudentSummary,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/student/") && url.includes("/indicators")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        indicators: mockStudentIndicators,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/student/") && url.includes("/grades")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        student_grades: mockStudentGrades,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/student/") && url.includes("/cognitive")) {
            console.log("DEMO COGNITIVE URL:", url);
            const userId = Number(url.split("/student/")[1].split("/")[0]);

            const student = mockStudents.find(
                (student) => student.user_id === userId
            );

            config.adapter = async () => ({
                data: {
                    data: {
                        forum_mean_level: student?.forum_mean_level ?? 3.2,
                        quiz_mean_level: student?.quiz_mean_level ?? 3.0,
                        assign_mean_level: student?.assign_mean_level ?? 3.1,
                        label: student?.cognitive_label ?? "médio",
                        subject_id: 101,
                        user_id: userId,
                        full_name: student?.full_name ?? "Aluno demonstrativo",
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/student/") && url.includes("/performance")) {
            console.log("DEMO PERFORMANCE URL:", url);
            const userId = Number(url.split("/student/")[1].split("/")[0]);

            const student = mockStudents.find(
                (student) => student.user_id === userId
            );

            config.adapter = async () => ({
                data: {
                    data: {
                        comparative: student?.comparative ?? 5,
                        media_percentual: student?.media_percentual ?? 78,
                        performance_label: student?.performance_label ?? "médio",
                        situation: "Aprovado",
                        subject_id: 101,
                        user_id: userId,
                        full_name: student?.full_name ?? "Aluno demonstrativo",
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/subject/") && url.includes("/student/") && url.includes("/motivation")) {
            console.log("DEMO MOTIVATION URL:", url);
            const userId = Number(url.split("/student/")[1].split("/")[0]);

            const student = mockStudents.find(
                (student) => student.user_id === userId
            );

            config.adapter = async () => ({
                data: {
                    data: {
                        num_posts_unrequired: student?.num_posts_unrequired ?? 5,
                        posts_unrequired_label: student?.motivation_label ?? "médio",
                        subject_id: 101,
                        user_id: userId,
                        full_name: student?.full_name ?? "Aluno demonstrativo",
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/tutors/general/summary")) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorsSummary,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/tutors/general/indicators")) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorsIndicators,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/tutors/general/rankings")) {
            const isBestPerformance = url.includes("best-performance");

            config.adapter = async () => ({
                data: {
                    data: {
                        ranking: isBestPerformance
                            ? mockTutorsRankingBest
                            : mockTutorsRankingAtRisk,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }


        if (url.includes("analysis/tutors/subject/") && url.includes("/summary")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        subject: mockTutorCourseSummary,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/tutors/subject/") && url.includes("/indicators")) {
            config.adapter = async () => ({
                data: {
                    data: {
                        subject: mockTutorCourseIndicators,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (
            url.includes("analysis/tutors/subject/") &&
            url.includes("/interaction_channels")
        ) {
            config.adapter = async () => ({
                data: {
                    data: {
                        subject: mockTutorInteractionChannels,
                    },
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (
            url.includes("analysis/tutors/subject/") &&
            url.includes("/rankings")
        ) {
            const isBestPerformance = url.includes("best-performance");

            config.adapter = async () => ({
                data: {
                    data: isBestPerformance
                        ? mockTutorCourseRankingBest
                        : mockTutorCourseRankingAtRisk,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

       if (
           url.includes("analysis/tutors/subject/101/tutor/201/indicators")
       ) {
           return {
               ...config,
               adapter: async () => ({
                   data: {
                       data: mockTutorDetailIndicators,
                   },
                   status: 200,
                   statusText: "OK",
                   headers: {},
                   config,
               }),
           }
       }

        if (
            url.includes("analysis/tutors/subject/101/tutor/201/access")
        ) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorDetailAccess,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (
            url.includes("analysis/tutors/subject/101/tutor/201/response_forums")
        ) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorDetailForums,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (
            url.includes("analysis/tutors/subject/101/tutor/201/feedback")
        ) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorDetailFeedback,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (
            url.includes("analysis/tutors/subject/101/tutor/201/graphs")
        ) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorDetailGraphs,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/tutors/subject/101/response_forums")) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorResponseForums,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/tutors/subject/101/access")) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorAccess,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("analysis/tutors/subject/101/feedback")) {
            config.adapter = async () => ({
                data: {
                    data: mockTutorFeedback,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }


        if (url.includes("/auth/users")) {
            config.adapter = async () => ({
                data: {
                    users: mockAdminUsers,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("/admin/moodle-config") && config.method === "get") {
            config.adapter = async () => ({
                data: {
                    config: mockMoodleConfig,
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        if (url.includes("/admin/scheduler/status")) {
            config.adapter = async () => ({
                data: mockSchedulerStatus,
                status: 200,
                statusText: "OK",
                headers: {},
                config,
            });
        }

        return config;
    });
}

export async function getCourses(): Promise<Curso[]> {
    const response = await api.get('/subjects/tutors');

    if (response.status != 200)
        return [];

    return response.data.data.subjects;
}

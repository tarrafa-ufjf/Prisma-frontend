import { api } from '@/utils/api';

type CognitiveData = {
  forum_mean_level: number;
  quiz_mean_level: number;
  assign_mean_level: number;
  label: string;
  subject_id: number;
  user_id: number;
  full_name: string;
};

type PerformanceData = {
  comparative: number;
  media_percentual: number;
  performance_label: string;
  situation: string;
  subject_id: number;
  user_id: number;
  full_name: string;
};

type MotivationData = {
  num_posts_unrequired: number;
  posts_unrequired_label: string;
  subject_id: number;
  user_id: number;
  full_name: string;
};

export async function getCognitiveData(
  subjectId: number,
  alunoId: number
): Promise<CognitiveData | null> {
  try {
    const response = await api.get(
      `/analysis/subject/${subjectId}/student/${alunoId}/cognitive`
    );

    if (response.status !== 200) return null;

    return response.data?.data;
  } catch (error) {
    console.error("Erro ao buscar cognitive:", error);
    return null;
  }
}

export async function getPerformanceData(
  subjectId: number,
  alunoId: number
): Promise<PerformanceData | null> {
  try {
    const response = await api.get(
      `/analysis/subject/${subjectId}/student/${alunoId}/performance`
    );

    if (response.status !== 200) return null;

    return response.data?.data;
  } catch (error) {
    console.error("Erro ao buscar performance:", error);
    return null;
  }
}

export async function getMotivationData(
  subjectId: number,
  alunoId: number
): Promise<MotivationData | null> {
  try {
    const response = await api.get(
      `/analysis/subject/${subjectId}/student/${alunoId}/motivation`
    );

    if (response.status !== 200) return null;

    return response.data?.data;
  } catch (error) {
    console.error("Erro ao buscar motivation:", error);
    return null;
  }
}
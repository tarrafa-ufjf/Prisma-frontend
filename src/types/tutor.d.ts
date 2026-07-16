export type Tutor = {
    id?: number;
    nome?: string;

    // response foruns
    label_forums_response: number;
    mean_forums_response_hours: number;
    mean_forums_response_hours_label: number;
    median_forums_response_hours: number;
    median_forums_response_hours_label: number;
    num_response_fast_forum: number;
    num_response_late_forum: number;
    num_response_normal_forum: number;
    score_access: number;
    score_access_label: number;
    total_response_forum: number;
    tutor_id: number;

    // Access
    label_access: number;
    maximum_inactivity_days: number;
    maximum_inactivity_days_label: number;
    n_login: number;
    n_login_label: number;
    n_login_subject: number;
    n_login_weekly: number;
    n_login_weekly_label: number;
    tutor_id: number;

    // Feedback

    label_feedback: number;
    n_corrections: number;
    n_corrections_label: number;
    n_corrections_with_feedback: number;
    n_corrections_with_feedback_label: number;
    n_feedback_pdf: number;
    n_feedback_pdf_label: number;
    n_textual_feedback: number;
    n_textual_feedback_label: number;
    percentage_feedback: number;
    percentage_feedback_label: number;
    tutor_id: number;
}
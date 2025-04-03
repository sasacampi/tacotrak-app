type UserGoal = "loss" | "gain" | "maintenance";

interface UserProfile {
  weight: number;
  height: number;
  goal: UserGoal;
  activityLevel: number;
}

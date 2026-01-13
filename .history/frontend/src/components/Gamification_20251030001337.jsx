import React, { useState, useEffect } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiTrophy, FiTarget, FiZap, FiAward, FiStar } from 'react-icons/fi';

const Gamification = ({ goals, transactions }) => {
  const [achievements, setAchievements] = useState([]);
  const [userLevel, setUserLevel] = useState(1);
  const [userPoints, setUserPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showReward, setShowReward] = useState(null);

  useEffect(() => {
    calculateUserStats();
    checkAchievements();
  }, [goals, transactions]);

  const calculateUserStats = () => {
    // Calculate points based on goals and transactions
    let points = 0;
    
    // Points for goals
    goals.forEach(goal => {
      const progress = (goal.currentAmount / goal.targetAmount) * 100;
      points += Math.floor(progress / 10); // 1 point per 10% progress
    });
    
    // Points for transactions (tracking consistency)
    const uniqueDays = new Set(transactions.map(t => t.date.split('T')[0])).size;
    points += uniqueDays * 2; // 2 points per day with transactions
    
    // Calculate level (1 level per 100 points)
    const level = Math.floor(points / 100) + 1;
    
    setUserPoints(points);
    setUserLevel(level);
    
    // Calculate streak (consecutive days with transactions)
    calculateStreak();
  };

  const calculateStreak = () => {
    const sortedDates = [...new Set(transactions.map(t => t.date.split('T')[0]))]
      .sort((a, b) => new Date(b) - new Date(a));
    
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const nextDate = i > 0 ? new Date(sortedDates[i - 1]) : null;
      
      if (!nextDate || (currentDate - nextDate) / (1000 * 60 * 60 * 24) === 1) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 1;
        if (i === 0) currentStreak = 1;
      }
    }
    
    maxStreak = Math.max(maxStreak, tempStreak);
    setStreak(currentStreak);
  };

  const checkAchievements = () => {
    const newAchievements = [];
    
    // First Transaction Achievement
    if (transactions.length >= 1) {
      newAchievements.push({
        id: 'first_transaction',
        title: 'First Step',
        description: 'Added your first transaction',
        icon: FiTarget,
        points: 10,
        unlocked: true
      });
    }
    
    // Goal Setter Achievement
    if (goals.length >= 1) {
      newAchievements.push({
        id: 'goal_setter',
        title: 'Goal Setter',
        description: 'Created your first financial goal',
        icon: FiTarget,
        points: 25,
        unlocked: true
      });
    }
    
    // Week Streak Achievement
    if (streak >= 7) {
      newAchievements.push({
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Maintained a 7-day tracking streak',
        icon: FiZap,
        points: 50,
        unlocked: true
      });
    }
    
    // Month Streak Achievement
    if (streak >= 30) {
      newAchievements.push({
        id: 'month_streak',
        title: 'Monthly Master',
        description: 'Maintained a 30-day tracking streak',
        icon: FiAward,
        points: 100,
        unlocked: true
      });
    }
    
    // Goal Achievement
    const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount);
    if (completedGoals.length >= 1) {
      newAchievements.push({
        id: 'goal_achiever',
        title: 'Goal Achiever',
        description: `Completed ${completedGoals.length} goal${completedGoals.length > 1 ? 's' : ''}`,
        icon: FiTrophy,
        points: 75,
        unlocked: true
      });
    }
    
    // Transaction Master Achievement
    if (transactions.length >= 100) {
      newAchievements.push({
        id: 'transaction_master',
        title: 'Transaction Master',
        description: 'Recorded 100+ transactions',
        icon: FiStar,
        points: 150,
        unlocked: true
      });
    }
    
    setAchievements(newAchievements);
  };

  const getNextLevelPoints = () => {
    return (userLevel * 100) - userPoints;
  };

  const getLevelProgress = () => {
    return ((userPoints % 100) / 100) * 100;
  };

  const getLevelTitle = (level) => {
    const titles = [
      'Beginner', 'Novice', 'Apprentice', 'Journeyman', 'Expert',
      'Master', 'Guru', 'Sage', 'Legend', 'Financial Wizard'
    ];
    return titles[Math.min(level - 1, titles.length - 1)];
  };

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Financial Journey</h2>
          <div className="flex items-center">
            <FiTrophy className="h-6 w-6 mr-2" />
            <span className="text-2xl font-bold">Level {userLevel}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{getLevelTitle(userLevel)}</span>
            <span>{userPoints} / {userLevel * 100} XP</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgress()}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{userPoints}</p>
            <p className="text-xs opacity-90">Total Points</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{streak}</p>
            <p className="text-xs opacity-90">Day Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{getNextLevelPoints()}</p>
            <p className="text-xs opacity-90">To Next Level</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiAward className="mr-2 h-5 w-5 text-yellow-500" />
          Achievements
        </h3>
        
        {achievements.length === 0 ? (
          <div className="text-center py-8">
            <FiTrophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Start tracking to unlock achievements!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`border rounded-lg p-4 ${
                  achievement.unlocked
                    ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 mr-3 ${
                    achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'
                  }`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${
                      achievement.unlocked
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-xs ${
                      achievement.unlocked
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs font-medium ${
                        achievement.unlocked
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        +{achievement.points} XP
                      </span>
                      {achievement.unlocked && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                          ✓ Unlocked
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Challenges */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiTarget className="mr-2 h-5 w-5 text-indigo-500" />
          Daily Challenges
        </h3>
        
        <div className="space-y-3">
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Track Every Day
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Add at least one transaction daily
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  +5 XP
                </span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Stay Under Budget
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Don't exceed any budget today
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  +10 XP
                </span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Review Goals
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Check progress on all goals
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  +3 XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
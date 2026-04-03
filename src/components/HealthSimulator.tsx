"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ==========================================
// データ定義
// ==========================================
const RAW_DATA = [
  { year: 20.29, category: "M1111", sex: "M", BP: 1, SM: 1, DM: 1, BMI: 1 },
  { year: 22.62, category: "M1112", sex: "M", BP: 1, SM: 1, DM: 1, BMI: 2 },
  { year: 23.86, category: "M1113", sex: "M", BP: 1, SM: 1, DM: 1, BMI: 3 },
  { year: 21.97, category: "M1114", sex: "M", BP: 1, SM: 1, DM: 1, BMI: 4 },
  { year: 18.74, category: "M1211", sex: "M", BP: 1, SM: 2, DM: 1, BMI: 1 },
  { year: 20.98, category: "M1212", sex: "M", BP: 1, SM: 2, DM: 1, BMI: 2 },
  { year: 22.1,  category: "M1213", sex: "M", BP: 1, SM: 2, DM: 1, BMI: 3 },
  { year: 20.47, category: "M1214", sex: "M", BP: 1, SM: 2, DM: 1, BMI: 4 },
  { year: 16.73, category: "M1311", sex: "M", BP: 1, SM: 3, DM: 1, BMI: 1 },
  { year: 18.76, category: "M1312", sex: "M", BP: 1, SM: 3, DM: 1, BMI: 2 },
  { year: 19.87, category: "M1313", sex: "M", BP: 1, SM: 3, DM: 1, BMI: 3 },
  { year: 18.07, category: "M1314", sex: "M", BP: 1, SM: 3, DM: 1, BMI: 4 },
  { year: 19.5,  category: "M2111", sex: "M", BP: 2, SM: 1, DM: 1, BMI: 1 },
  { year: 22.01, category: "M2112", sex: "M", BP: 2, SM: 1, DM: 1, BMI: 2 },
  { year: 23.09, category: "M2113", sex: "M", BP: 2, SM: 1, DM: 1, BMI: 3 },
  { year: 21.06, category: "M2114", sex: "M", BP: 2, SM: 1, DM: 1, BMI: 4 },
  { year: 18.02, category: "M2211", sex: "M", BP: 2, SM: 2, DM: 1, BMI: 1 },
  { year: 20.27, category: "M2212", sex: "M", BP: 2, SM: 2, DM: 1, BMI: 2 },
  { year: 21.32, category: "M2213", sex: "M", BP: 2, SM: 2, DM: 1, BMI: 3 },
  { year: 19.61, category: "M2214", sex: "M", BP: 2, SM: 2, DM: 1, BMI: 4 },
  { year: 16.02, category: "M2311", sex: "M", BP: 2, SM: 3, DM: 1, BMI: 1 },
  { year: 18.09, category: "M2312", sex: "M", BP: 2, SM: 3, DM: 1, BMI: 2 },
  { year: 19.12, category: "M2313", sex: "M", BP: 2, SM: 3, DM: 1, BMI: 3 },
  { year: 17.26, category: "M2314", sex: "M", BP: 2, SM: 3, DM: 1, BMI: 4 },
  { year: 18.04, category: "M3111", sex: "M", BP: 3, SM: 1, DM: 1, BMI: 1 },
  { year: 20.77, category: "M3112", sex: "M", BP: 3, SM: 1, DM: 1, BMI: 2 },
  { year: 21.57, category: "M3113", sex: "M", BP: 3, SM: 1, DM: 1, BMI: 3 },
  { year: 19.86, category: "M3114", sex: "M", BP: 3, SM: 1, DM: 1, BMI: 4 },
  { year: 16.56, category: "M3211", sex: "M", BP: 3, SM: 2, DM: 1, BMI: 1 },
  { year: 18.88, category: "M3212", sex: "M", BP: 3, SM: 2, DM: 1, BMI: 2 },
  { year: 19.7,  category: "M3213", sex: "M", BP: 3, SM: 2, DM: 1, BMI: 3 },
  { year: 18.42, category: "M3214", sex: "M", BP: 3, SM: 2, DM: 1, BMI: 4 },
  { year: 14.83, category: "M3311", sex: "M", BP: 3, SM: 3, DM: 1, BMI: 1 },
  { year: 16.98, category: "M3312", sex: "M", BP: 3, SM: 3, DM: 1, BMI: 2 },
  { year: 17.83, category: "M3313", sex: "M", BP: 3, SM: 3, DM: 1, BMI: 3 },
  { year: 16.25, category: "M3314", sex: "M", BP: 3, SM: 3, DM: 1, BMI: 4 },
  { year: 17.17, category: "M4111", sex: "M", BP: 4, SM: 1, DM: 1, BMI: 1 },
  { year: 19.78, category: "M4112", sex: "M", BP: 4, SM: 1, DM: 1, BMI: 2 },
  { year: 20.56, category: "M4113", sex: "M", BP: 4, SM: 1, DM: 1, BMI: 3 },
  { year: 18.92, category: "M4114", sex: "M", BP: 4, SM: 1, DM: 1, BMI: 4 },
  { year: 15.73, category: "M4211", sex: "M", BP: 4, SM: 2, DM: 1, BMI: 1 },
  { year: 17.96, category: "M4212", sex: "M", BP: 4, SM: 2, DM: 1, BMI: 2 },
  { year: 18.76, category: "M4213", sex: "M", BP: 4, SM: 2, DM: 1, BMI: 3 },
  { year: 17.53, category: "M4214", sex: "M", BP: 4, SM: 2, DM: 1, BMI: 4 },
  { year: 14.05, category: "M4311", sex: "M", BP: 4, SM: 3, DM: 1, BMI: 1 },
  { year: 16.12, category: "M4312", sex: "M", BP: 4, SM: 3, DM: 1, BMI: 2 },
  { year: 16.95, category: "M4313", sex: "M", BP: 4, SM: 3, DM: 1, BMI: 3 },
  { year: 15.42, category: "M4314", sex: "M", BP: 4, SM: 3, DM: 1, BMI: 4 },
  { year: 17.56, category: "M1121", sex: "M", BP: 1, SM: 1, DM: 2, BMI: 1 },
  { year: 19.63, category: "M1122", sex: "M", BP: 1, SM: 1, DM: 2, BMI: 2 },
  { year: 20.8,  category: "M1123", sex: "M", BP: 1, SM: 1, DM: 2, BMI: 3 },
  { year: 18.87, category: "M1124", sex: "M", BP: 1, SM: 1, DM: 2, BMI: 4 },
  { year: 16.21, category: "M1221", sex: "M", BP: 1, SM: 2, DM: 2, BMI: 1 },
  { year: 18.2,  category: "M1222", sex: "M", BP: 1, SM: 2, DM: 2, BMI: 2 },
  { year: 19.28, category: "M1223", sex: "M", BP: 1, SM: 2, DM: 2, BMI: 3 },
  { year: 17.54, category: "M1224", sex: "M", BP: 1, SM: 2, DM: 2, BMI: 4 },
  { year: 14.25, category: "M1321", sex: "M", BP: 1, SM: 3, DM: 2, BMI: 1 },
  { year: 16.06, category: "M1322", sex: "M", BP: 1, SM: 3, DM: 2, BMI: 2 },
  { year: 17.12, category: "M1323", sex: "M", BP: 1, SM: 3, DM: 2, BMI: 3 },
  { year: 15.3,  category: "M1324", sex: "M", BP: 1, SM: 3, DM: 2, BMI: 4 },
  { year: 16.81, category: "M2121", sex: "M", BP: 2, SM: 1, DM: 2, BMI: 1 },
  { year: 19.13, category: "M2122", sex: "M", BP: 2, SM: 1, DM: 2, BMI: 2 },
  { year: 20.14, category: "M2123", sex: "M", BP: 2, SM: 1, DM: 2, BMI: 3 },
  { year: 18.03, category: "M2124", sex: "M", BP: 2, SM: 1, DM: 2, BMI: 4 },
  { year: 15.51, category: "M2221", sex: "M", BP: 2, SM: 2, DM: 2, BMI: 1 },
  { year: 17.56, category: "M2222", sex: "M", BP: 2, SM: 2, DM: 2, BMI: 2 },
  { year: 18.56, category: "M2223", sex: "M", BP: 2, SM: 2, DM: 2, BMI: 3 },
  { year: 16.74, category: "M2224", sex: "M", BP: 2, SM: 2, DM: 2, BMI: 4 },
  { year: 13.57, category: "M2321", sex: "M", BP: 2, SM: 3, DM: 2, BMI: 1 },
  { year: 15.47, category: "M2322", sex: "M", BP: 2, SM: 3, DM: 2, BMI: 2 },
  { year: 16.44, category: "M2323", sex: "M", BP: 2, SM: 3, DM: 2, BMI: 3 },
  { year: 14.55, category: "M2324", sex: "M", BP: 2, SM: 3, DM: 2, BMI: 4 },
  { year: 15.63, category: "M3121", sex: "M", BP: 3, SM: 1, DM: 2, BMI: 1 },
  { year: 18.18, category: "M3122", sex: "M", BP: 3, SM: 1, DM: 2, BMI: 2 },
  { year: 18.98, category: "M3123", sex: "M", BP: 3, SM: 1, DM: 2, BMI: 3 },
  { year: 17.01, category: "M3124", sex: "M", BP: 3, SM: 1, DM: 2, BMI: 4 },
  { year: 14.33, category: "M3221", sex: "M", BP: 3, SM: 2, DM: 2, BMI: 1 },
  { year: 16.48, category: "M3222", sex: "M", BP: 3, SM: 2, DM: 2, BMI: 2 },
  { year: 17.29, category: "M3223", sex: "M", BP: 3, SM: 2, DM: 2, BMI: 3 },
  { year: 15.74, category: "M3224", sex: "M", BP: 3, SM: 2, DM: 2, BMI: 4 },
  { year: 12.59, category: "M3321", sex: "M", BP: 3, SM: 3, DM: 2, BMI: 1 },
  { year: 14.58, category: "M3322", sex: "M", BP: 3, SM: 3, DM: 2, BMI: 2 },
  { year: 15.41, category: "M3323", sex: "M", BP: 3, SM: 3, DM: 2, BMI: 3 },
  { year: 13.68, category: "M3324", sex: "M", BP: 3, SM: 3, DM: 2, BMI: 4 },
  { year: 14.82, category: "M4121", sex: "M", BP: 4, SM: 1, DM: 2, BMI: 1 },
  { year: 17.27, category: "M4122", sex: "M", BP: 4, SM: 1, DM: 2, BMI: 2 },
  { year: 18.05, category: "M4123", sex: "M", BP: 4, SM: 1, DM: 2, BMI: 3 },
  { year: 16.16, category: "M4124", sex: "M", BP: 4, SM: 1, DM: 2, BMI: 4 },
  { year: 13.57, category: "M4221", sex: "M", BP: 4, SM: 2, DM: 2, BMI: 1 },
  { year: 15.63, category: "M4222", sex: "M", BP: 4, SM: 2, DM: 2, BMI: 2 },
  { year: 16.43, category: "M4223", sex: "M", BP: 4, SM: 2, DM: 2, BMI: 3 },
  { year: 14.93, category: "M4224", sex: "M", BP: 4, SM: 2, DM: 2, BMI: 4 },
  { year: 11.88, category: "M4321", sex: "M", BP: 4, SM: 3, DM: 2, BMI: 1 },
  { year: 13.79, category: "M4322", sex: "M", BP: 4, SM: 3, DM: 2, BMI: 2 },
  { year: 14.6,  category: "M4323", sex: "M", BP: 4, SM: 3, DM: 2, BMI: 3 },
  { year: 12.93, category: "M4324", sex: "M", BP: 4, SM: 3, DM: 2, BMI: 4 },
  { year: 22.59, category: "F1111", sex: "F", BP: 1, SM: 1, DM: 1, BMI: 1 },
  { year: 26.3,  category: "F1112", sex: "F", BP: 1, SM: 1, DM: 1, BMI: 2 },
  { year: 26.11, category: "F1113", sex: "F", BP: 1, SM: 1, DM: 1, BMI: 3 },
  { year: 27.27, category: "F1114", sex: "F", BP: 1, SM: 1, DM: 1, BMI: 4 },
  { year: 18.15, category: "F1211", sex: "F", BP: 1, SM: 2, DM: 1, BMI: 1 },
  { year: 21.15, category: "F1212", sex: "F", BP: 1, SM: 2, DM: 1, BMI: 2 },
  { year: 21.02, category: "F1213", sex: "F", BP: 1, SM: 2, DM: 1, BMI: 3 },
  { year: 21.81, category: "F1214", sex: "F", BP: 1, SM: 2, DM: 1, BMI: 4 },
  { year: 18.79, category: "F1311", sex: "F", BP: 1, SM: 3, DM: 1, BMI: 1 },
  { year: 22.06, category: "F1312", sex: "F", BP: 1, SM: 3, DM: 1, BMI: 2 },
  { year: 22.01, category: "F1313", sex: "F", BP: 1, SM: 3, DM: 1, BMI: 3 },
  { year: 23.2,  category: "F1314", sex: "F", BP: 1, SM: 3, DM: 1, BMI: 4 },
  { year: 21.12, category: "F2111", sex: "F", BP: 2, SM: 1, DM: 1, BMI: 1 },
  { year: 25.16, category: "F2112", sex: "F", BP: 2, SM: 1, DM: 1, BMI: 2 },
  { year: 24.87, category: "F2113", sex: "F", BP: 2, SM: 1, DM: 1, BMI: 3 },
  { year: 26.28, category: "F2114", sex: "F", BP: 2, SM: 1, DM: 1, BMI: 4 },
  { year: 26.89, category: "F2211", sex: "F", BP: 2, SM: 2, DM: 1, BMI: 1 },
  { year: 19.82, category: "F2212", sex: "F", BP: 2, SM: 2, DM: 1, BMI: 2 },
  { year: 19.64, category: "F2213", sex: "F", BP: 2, SM: 2, DM: 1, BMI: 3 },
  { year: 20.34, category: "F2214", sex: "F", BP: 2, SM: 2, DM: 1, BMI: 4 },
  { year: 17.62, category: "F2311", sex: "F", BP: 2, SM: 3, DM: 1, BMI: 1 },
  { year: 21.27, category: "F2312", sex: "F", BP: 2, SM: 3, DM: 1, BMI: 2 },
  { year: 21.18, category: "F2313", sex: "F", BP: 2, SM: 3, DM: 1, BMI: 3 },
  { year: 22.53, category: "F2314", sex: "F", BP: 2, SM: 3, DM: 1, BMI: 4 },
  { year: 19.98, category: "F3111", sex: "F", BP: 3, SM: 1, DM: 1, BMI: 1 },
  { year: 21.65, category: "F3112", sex: "F", BP: 3, SM: 1, DM: 1, BMI: 2 },
  { year: 23.35, category: "F3113", sex: "F", BP: 3, SM: 1, DM: 1, BMI: 3 },
  { year: 24.49, category: "F3114", sex: "F", BP: 3, SM: 1, DM: 1, BMI: 4 },
  { year: 15.89, category: "F3211", sex: "F", BP: 3, SM: 2, DM: 1, BMI: 1 },
  { year: 18.75, category: "F3212", sex: "F", BP: 3, SM: 2, DM: 1, BMI: 2 },
  { year: 18.56, category: "F3213", sex: "F", BP: 3, SM: 2, DM: 1, BMI: 3 },
  { year: 19.22, category: "F3214", sex: "F", BP: 3, SM: 2, DM: 1, BMI: 4 },
  { year: 16.63, category: "F3311", sex: "F", BP: 3, SM: 3, DM: 1, BMI: 1 },
  { year: 19.98, category: "F3312", sex: "F", BP: 3, SM: 3, DM: 1, BMI: 2 },
  { year: 19.87, category: "F3313", sex: "F", BP: 3, SM: 3, DM: 1, BMI: 3 },
  { year: 21.09, category: "F3314", sex: "F", BP: 3, SM: 3, DM: 1, BMI: 4 },
  { year: 18.93, category: "F4111", sex: "F", BP: 4, SM: 1, DM: 1, BMI: 1 },
  { year: 22.44, category: "F4112", sex: "F", BP: 4, SM: 1, DM: 1, BMI: 2 },
  { year: 22.14, category: "F4113", sex: "F", BP: 4, SM: 1, DM: 1, BMI: 3 },
  { year: 23.17, category: "F4114", sex: "F", BP: 4, SM: 1, DM: 1, BMI: 4 },
  { year: 14.98, category: "F4211", sex: "F", BP: 4, SM: 2, DM: 1, BMI: 1 },
  { year: 17.76, category: "F4212", sex: "F", BP: 4, SM: 2, DM: 1, BMI: 2 },
  { year: 17.56, category: "F4213", sex: "F", BP: 4, SM: 2, DM: 1, BMI: 3 },
  { year: 18.18, category: "F4214", sex: "F", BP: 4, SM: 2, DM: 1, BMI: 4 },
  { year: 15.73, category: "F4311", sex: "F", BP: 4, SM: 3, DM: 1, BMI: 1 },
  { year: 18.95, category: "F4312", sex: "F", BP: 4, SM: 3, DM: 1, BMI: 2 },
  { year: 18.83, category: "F4313", sex: "F", BP: 4, SM: 3, DM: 1, BMI: 3 },
  { year: 19.98, category: "F4314", sex: "F", BP: 4, SM: 3, DM: 1, BMI: 4 },
  { year: 18.31, category: "F1121", sex: "F", BP: 1, SM: 1, DM: 2, BMI: 1 },
  { year: 21.65, category: "F1122", sex: "F", BP: 1, SM: 1, DM: 2, BMI: 2 },
  { year: 21.47, category: "F1123", sex: "F", BP: 1, SM: 1, DM: 2, BMI: 3 },
  { year: 22.54, category: "F1124", sex: "F", BP: 1, SM: 1, DM: 2, BMI: 4 },
  { year: 14.35, category: "F1221", sex: "F", BP: 1, SM: 2, DM: 2, BMI: 1 },
  { year: 17.03, category: "F1222", sex: "F", BP: 1, SM: 2, DM: 2, BMI: 2 },
  { year: 16.92, category: "F1223", sex: "F", BP: 1, SM: 2, DM: 2, BMI: 3 },
  { year: 17.62, category: "F1224", sex: "F", BP: 1, SM: 2, DM: 2, BMI: 4 },
  { year: 14.91, category: "F1321", sex: "F", BP: 1, SM: 3, DM: 2, BMI: 1 },
  { year: 17.95, category: "F1322", sex: "F", BP: 1, SM: 3, DM: 2, BMI: 2 },
  { year: 17.91, category: "F1323", sex: "F", BP: 1, SM: 3, DM: 2, BMI: 3 },
  { year: 19.05, category: "F1324", sex: "F", BP: 1, SM: 3, DM: 2, BMI: 4 },
  { year: 17.01, category: "F2121", sex: "F", BP: 2, SM: 1, DM: 2, BMI: 1 },
  { year: 20.82, category: "F2122", sex: "F", BP: 2, SM: 1, DM: 2, BMI: 2 },
  { year: 20.56, category: "F2123", sex: "F", BP: 2, SM: 1, DM: 2, BMI: 3 },
  { year: 21.91, category: "F2124", sex: "F", BP: 2, SM: 1, DM: 2, BMI: 4 },
  { year: 13.24, category: "F2221", sex: "F", BP: 2, SM: 2, DM: 2, BMI: 1 },
  { year: 15.85, category: "F2222", sex: "F", BP: 2, SM: 2, DM: 2, BMI: 2 },
  { year: 15.7,  category: "F2223", sex: "F", BP: 2, SM: 2, DM: 2, BMI: 3 },
  { year: 16.32, category: "F2224", sex: "F", BP: 2, SM: 2, DM: 2, BMI: 4 },
  { year: 13.87, category: "F2321", sex: "F", BP: 2, SM: 3, DM: 2, BMI: 1 },
  { year: 17.31, category: "F2322", sex: "F", BP: 2, SM: 3, DM: 2, BMI: 2 },
  { year: 17.26, category: "F2323", sex: "F", BP: 2, SM: 3, DM: 2, BMI: 3 },
  { year: 18.5,  category: "F2324", sex: "F", BP: 2, SM: 3, DM: 2, BMI: 4 },
  { year: 16,    category: "F3121", sex: "F", BP: 3, SM: 1, DM: 2, BMI: 1 },
  { year: 19.42, category: "F3122", sex: "F", BP: 3, SM: 1, DM: 2, BMI: 2 },
  { year: 19.16, category: "F3123", sex: "F", BP: 3, SM: 1, DM: 2, BMI: 3 },
  { year: 20.27, category: "F3124", sex: "F", BP: 3, SM: 1, DM: 2, BMI: 4 },
  { year: 12.36, category: "F3221", sex: "F", BP: 3, SM: 2, DM: 2, BMI: 1 },
  { year: 14.89, category: "F3222", sex: "F", BP: 3, SM: 2, DM: 2, BMI: 2 },
  { year: 14.73, category: "F3223", sex: "F", BP: 3, SM: 2, DM: 2, BMI: 3 },
  { year: 15.32, category: "F3224", sex: "F", BP: 3, SM: 2, DM: 2, BMI: 4 },
  { year: 13,    category: "F3321", sex: "F", BP: 3, SM: 3, DM: 2, BMI: 1 },
  { year: 16.13, category: "F3322", sex: "F", BP: 3, SM: 3, DM: 2, BMI: 2 },
  { year: 16.05, category: "F3323", sex: "F", BP: 3, SM: 3, DM: 2, BMI: 3 },
  { year: 17.21, category: "F3324", sex: "F", BP: 3, SM: 3, DM: 2, BMI: 4 },
  { year: 15.07, category: "F4121", sex: "F", BP: 4, SM: 1, DM: 2, BMI: 1 },
  { year: 18.34, category: "F4122", sex: "F", BP: 4, SM: 1, DM: 2, BMI: 2 },
  { year: 18.07, category: "F4123", sex: "F", BP: 4, SM: 1, DM: 2, BMI: 3 },
  { year: 19.08, category: "F4124", sex: "F", BP: 4, SM: 1, DM: 2, BMI: 4 },
  { year: 11.57, category: "F4221", sex: "F", BP: 4, SM: 2, DM: 2, BMI: 1 },
  { year: 14.01, category: "F4222", sex: "F", BP: 4, SM: 2, DM: 2, BMI: 2 },
  { year: 13.85, category: "F4223", sex: "F", BP: 4, SM: 2, DM: 2, BMI: 3 },
  { year: 14.4,  category: "F4224", sex: "F", BP: 4, SM: 2, DM: 2, BMI: 4 },
  { year: 12.2,  category: "F4321", sex: "F", BP: 4, SM: 3, DM: 2, BMI: 1 },
  { year: 15.2,  category: "F4322", sex: "F", BP: 4, SM: 3, DM: 2, BMI: 2 },
  { year: 15.1,  category: "F4323", sex: "F", BP: 4, SM: 3, DM: 2, BMI: 3 },
  { year: 16.21, category: "F4324", sex: "F", BP: 4, SM: 3, DM: 2, BMI: 4 },
];

const BP_MAP: Record<number, string> = { 1: "正常", 2: "正常高値/高値", 3: "Ⅰ度高血圧", 4: "Ⅱ/Ⅲ度高血圧" };
const SM_MAP: Record<number, string> = { 1: "吸わない", 2: "過去に喫煙", 3: "現在喫煙" };
const DM_MAP: Record<number, string> = { 1: "なし", 2: "あり" };
const BMI_MAP: Record<number, string> = { 1: "やせ（<18.5）", 2: "標準（18.5-24.9）", 3: "過体重（25-29.9）", 4: "肥満（30+）" };

function getYear(sex: string, bp: number, sm: number, dm: number, bmi: number): number | null {
  const row = RAW_DATA.find(
    (d) => d.sex === sex && d.BP === bp && d.SM === sm && d.DM === dm && d.BMI === bmi
  );
  return row ? row.year : null;
}

type SelectProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  options: Record<number, string>;
  icon: string;
};

function SelectField({ label, value, onChange, options, icon }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
        <span>{icon}</span>{label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
      >
        {Object.entries(options).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
    </div>
  );
}

export function HealthSimulator() {
  const [sex, setSex] = useState<"M" | "F">("M");
  const [bpB, setBpB] = useState(1);
  const [smB, setSmB] = useState(1);
  const [dmB, setDmB] = useState(1);
  const [bmiB, setBmiB] = useState(2);
  const [bpA, setBpA] = useState(1);
  const [smA, setSmA] = useState(1);
  const [dmA, setDmA] = useState(1);
  const [bmiA, setBmiA] = useState(2);
  const [result, setResult] = useState<{ yB: number; yA: number } | null>(null);

  const handleCalc = () => {
    const yB = getYear(sex, bpB, smB, dmB, bmiB);
    const yA = getYear(sex, bpA, smA, dmA, bmiA);
    if (yB !== null && yA !== null) {
      setResult({ yB, yA });
    }
  };

  const diff = result ? result.yA - result.yB : 0;

  const chartData = result
    ? [
        { name: "血圧", 現在: bpB, 目標: bpA },
        { name: "喫煙", 現在: smB, 目標: smA },
        { name: "糖尿病", 現在: dmB, 目標: dmA },
        { name: "BMI", 現在: bmiB, 目標: bmiA },
      ]
    : [];

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="bg-[#151f33] text-white rounded-2xl p-6">
          <h2 className="text-lg font-bold">健康寿命シミュレーター</h2>
          <p className="text-sm text-white/60 mt-1">
            生活習慣の改善による健康寿命の延伸効果を可視化します。65歳時点で何年の延伸が期待できるかを示しています。
          </p>
        </div>

        {/* 性別選択 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 mb-3">性別</p>
          <div className="flex gap-3">
            {(["M", "F"] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setSex(s); setResult(null); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  sex === s
                    ? "bg-[#151f33] text-white shadow"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {s === "M" ? "👨 男性" : "👩 女性"}
              </button>
            ))}
          </div>
        </div>

        {/* 現在・目標 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 現在 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <p className="text-sm font-bold text-slate-700 border-b pb-2">📋 現在</p>
            <SelectField label="血圧" value={bpB} onChange={(v) => { setBpB(v); setResult(null); }} options={BP_MAP} icon="🩸" />
            <SelectField label="喫煙" value={smB} onChange={(v) => { setSmB(v); setResult(null); }} options={SM_MAP} icon="🚬" />
            <SelectField label="糖尿病" value={dmB} onChange={(v) => { setDmB(v); setResult(null); }} options={DM_MAP} icon="🍬" />
            <SelectField label="BMI" value={bmiB} onChange={(v) => { setBmiB(v); setResult(null); }} options={BMI_MAP} icon="⚖️" />
          </div>

          {/* 目標 */}
          <div className="bg-white rounded-2xl p-5 border border-sky-200 shadow-sm space-y-4">
            <p className="text-sm font-bold text-sky-700 border-b border-sky-100 pb-2">✨ 目標</p>
            <SelectField label="血圧" value={bpA} onChange={(v) => { setBpA(v); setResult(null); }} options={BP_MAP} icon="🩸" />
            <SelectField label="喫煙" value={smA} onChange={(v) => { setSmA(v); setResult(null); }} options={SM_MAP} icon="🚬" />
            <SelectField label="糖尿病" value={dmA} onChange={(v) => { setDmA(v); setResult(null); }} options={DM_MAP} icon="🍬" />
            <SelectField label="BMI" value={bmiA} onChange={(v) => { setBmiA(v); setResult(null); }} options={BMI_MAP} icon="⚖️" />
          </div>
        </div>

        {/* 計算ボタン */}
        <button
          onClick={handleCalc}
          className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
        >
          🚀 結果を表示する
        </button>

        {/* 結果 */}
        {result && (
          <div className="space-y-4">
            {/* メトリクス */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                <p className="text-xs text-slate-400 font-bold mb-1">現状の予測健康寿命</p>
                <p className="text-3xl font-bold text-slate-800">{result.yB.toFixed(2)}<span className="text-base font-normal text-slate-400 ml-1">年</span></p>
              </div>
              <div className={`rounded-2xl p-5 border shadow-sm text-center ${diff > 0 ? "bg-emerald-50 border-emerald-200" : diff < 0 ? "bg-red-50 border-red-200" : "bg-white border-slate-200"}`}>
                <p className="text-xs text-slate-400 font-bold mb-1">目標達成時の予測寿命</p>
                <p className="text-3xl font-bold text-slate-800">{result.yA.toFixed(2)}<span className="text-base font-normal text-slate-400 ml-1">年</span></p>
                <p className={`text-sm font-bold mt-1 ${diff > 0 ? "text-emerald-600" : diff < 0 ? "text-red-500" : "text-slate-400"}`}>
                  {diff > 0 ? `+${diff.toFixed(2)} 年` : diff < 0 ? `${diff.toFixed(2)} 年` : "変化なし"}
                </p>
              </div>
            </div>

            {/* メッセージ */}
            {diff > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm text-emerald-700 font-medium">
                💡 改善により健康寿命が <strong>{diff.toFixed(2)}年</strong> 延びる可能性があります。
              </div>
            )}
            {diff <= 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-700 font-medium">
                ⚠️ 目標設定を見直して、より良い生活習慣を目指しましょう。
              </div>
            )}

            {/* グラフ */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-500 mb-4">リスクレベル比較（低いほど低リスク）</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="現在" fill="#AED6F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="目標" fill="#F5B041" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 出典 */}
            <p className="text-[10px] text-slate-400 leading-relaxed">
              ※本データの出典　Tsukinoki R, et al. Comprehensive assessment of the impact of blood pressure, body mass index, smoking, and diabetes on healthy life expectancy in Japan: NIPPON DATA90. J Epidemiol. 2025 Jan 11;35(8):349–54
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

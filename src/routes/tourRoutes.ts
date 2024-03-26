import { restrictTo, protect } from "../controllers/authController";
import {
   aliasTopTours,
   createTour,
   deleteTour,
   getAllTours,
   getMonthlyPlan,
   getTour,
   getTourStats,

   // insertAllTours,
   updateTour,
} from "../controllers/tourController";
import express from "express";
import { Role } from "../types";
import ReviewRouter from "./reviewRouter";
// const tourController = require('./../controllers/ts');

const toursRouter = express.Router();

toursRouter.use("/:tourId/reviews", ReviewRouter);
toursRouter
   .route("/")
   .get(getAllTours)
   .post(protect, restrictTo(Role.Admin, Role.LeadGuide), createTour);
toursRouter.route("/tours-stats").get(getTourStats);
toursRouter
   .route("/monthly-plan/:year")
   .get(
      protect,
      restrictTo(Role.Admin, Role.LeadGuide, Role.Guide),
      getMonthlyPlan,
   );
toursRouter.route("/top-5-cheap").get(aliasTopTours, getAllTours);
toursRouter
   .route("/:id")
   .get(getTour)
   .patch(protect, restrictTo(Role.Admin, Role.LeadGuide), updateTour)
   .delete(protect, restrictTo(Role.Admin), deleteTour);

export default toursRouter;

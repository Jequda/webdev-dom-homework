"use strict";

import { fetchAndRenderTasks } from "./api.js";
import { errorButton } from "./eventListeners.js";


fetchAndRenderTasks();
errorButton();


console.log("It works!");

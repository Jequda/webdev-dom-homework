"use strict";

import { fetchAndRenderTasks } from "./api.js";
import { errorButton } from "./eventListeners.js";
import { auth } from "./renderAuth.js";

fetchAndRenderTasks();
errorButton();
auth();

console.log("It works!");

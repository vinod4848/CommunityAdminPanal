import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import eventService from "./eventservice";

export const getEvent = createAsyncThunk(
  "event/getAllEvent",
  async (thunkAPI) => {
    try {
      return await eventService.getEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (eventData, thunkAPI) => {
    try {
      return await eventService.createEvent(eventData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAAEvent = createAsyncThunk(
  "event/get-event",
  async (id, thunkAPI) => {
    try {
      return await eventService.getEvent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAEvent = createAsyncThunk(
  "event/get-update",
  async (id, thunkAPI) => {
    try {
      return await eventService.updateEvent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAEvent = createAsyncThunk(
  "event/delete-event",
  async (id, thunkAPI) => {
    try {
      await eventService.deleteEvent(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  events: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  event: {},
  message: "",
};
export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdevent = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAAEvent.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAAEvent.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.event.eventData = action.payload.title;
        state.event.eventData = action.payload.description;
        state.event.eventData = action.payload.image;
        state.event.eventData = action.payload.category;
        state.event.eventData = action.payload.date;
      })
      .addCase(getAAEvent.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAEvent.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateAEvent.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEvent = action.payload;
      })
      .addCase(updateAEvent.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAEvent.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteAEvent.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedEvent = action.payload;
      })
      .addCase(deleteAEvent.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default eventSlice.reducer;

const { Course, Meeting } = require("../models");
const axios = require("axios");
class MeetingController {
  static async createMeeting(req, res, next) {
    try {
      const { CourseId } = req.params;
      console.log(CourseId);

      const course = await Course.findByPk(CourseId);
      if (!course) throw { name: "course_not_found" };

      const { agenda, topic, start_time, duration } = req.body;
      const { token } = req.headers;
      let body = {
        agenda: agenda,
        topic: topic,
        type: 2,
        start_time: start_time,
        duration: duration,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: "true",
          watermark: "true",
          audio: "voip",
          auto_recording: "cloud",
        },
      };

      const { data } = await axios({
        method: "post",
        url: "https://api.zoom.us/v2/users/me/meetings",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });

      const join_url = data.join_url;
      const start_url = data.start_url;
      const zoom_id = data.id;
      await course.update({ status: true });
      const meeting = await Meeting.create({ CourseId, join_url, start_url, zoom_id });
      res.status(201).json(meeting);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteMeeting(req, res, next) {
    try {
      const { id, zoomId } = req.params;
      const { token } = req.headers;
      const meeting = await Meeting.findByPk(id, { include: Course });
      if (!meeting) throw { name: "meeting_not_found" };

      const course = await Course.findOne({ where: { id: meeting.Course.id } });
      course.update({ status: false });
      await meeting.destroy();
      await axios({
        method: "delete",
        url: "https://api.zoom.us/v2/meetings/" + zoomId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.json({ message: "Success delete meeting" });
    } catch (error) {
      next(error);
    }
  }

  static async getMeeting(req, res, next) {
    try {
      const meetings = await Meeting.findAll({ include: Course });
      res.json(meetings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MeetingController;

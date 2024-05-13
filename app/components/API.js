const IP_ADDRESS = "192.168.142.83";

export default API = {
  get_subjects: `http://${IP_ADDRESS}/WEB APPLICATIONS/brainybattle/CONTROLLERS/get_subjects.php`,
  get_questions: `http://${IP_ADDRESS}/WEB APPLICATIONS/brainybattle/CONTROLLERS/get_questions.php`,
  get_levels: `http://${IP_ADDRESS}/WEB APPLICATIONS/brainybattle/CONTROLLERS/get_level.php`,
  get_videos: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/brainybattle/CONTROLLERS/get_video.php`,
  video_concat: `http://${IP_ADDRESS}`,
  get_topics: `http://${IP_ADDRESS}/WEB APPLICATIONS/bbV2/PUPIL/get_topics.php`
};
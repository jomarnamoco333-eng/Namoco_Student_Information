module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Teacher, {
      foreignKey: "teacher_id",
    });
    Course.hasMany(models.Enrollment, {
      foreignKey: "course_id",
    });
  };

  return Course;
};

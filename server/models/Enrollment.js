module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define("Enrollment", {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.Student, {
      foreignKey: "student_id",
    });
    Enrollment.belongsTo(models.Course, {
      foreignKey: "course_id",
    });
  };

  return Enrollment;
};

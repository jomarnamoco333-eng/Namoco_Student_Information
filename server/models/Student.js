module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Student.associate = (models) => {
    Student.hasMany(models.Enrollment, {
      foreignKey: "student_id",
    });
  };

  return Student;
};

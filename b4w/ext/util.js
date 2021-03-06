"use strict";

/**
 * Implements various utility functions.
 * @module util
 */
b4w.module["util"] = function(exports, require) {

var m_print = require("__print");
var util    = require("__util");

var m_vec3 = require("vec3");
var m_mat4 = require("mat4");

/**
 * x-axis vector
 * @const {Float32Array} module:util.AXIS_X
 */
exports.AXIS_X  = new Float32Array([1, 0, 0]);
/**
 * y-axis vector
 * @const {Float32Array} module:util.AXIS_Y
 */
exports.AXIS_Y  = new Float32Array([0, 1, 0]);
/**
 * z-axis vector
 * @const {Float32Array} module:util.AXIS_Z
 */
exports.AXIS_Z  = new Float32Array([0, 0, 1]);
/**
 * negative x-axis vector
 * @const {Float32Array} module:util.AXIS_MX
 */
exports.AXIS_MX = new Float32Array([-1, 0, 0]);
/**
 * negative y-axis vector
 * @const {Float32Array} module:util.AXIS_MY
 */
exports.AXIS_MY = new Float32Array([ 0,-1, 0]);
/**
 * negative z-axis vector
 * @const {Float32Array} module:util.AXIS_MZ
 */
exports.AXIS_MZ = new Float32Array([ 0, 0,-1]);

/**
 * @method module:util.keyfind
 */
exports.keyfind = util.keyfind;

/**
 * @method module:util.keysearch
 */
exports.keysearch = util.keysearch;

/**
 * Extract rotation from the 4x4 matrix to quaternion vector.
 * @method module:util.matrix_to_quat
 * @param {Float32Array} matrix 4x4 matrix
 * @returns {Float32Array} Quaternion
 */
exports.matrix_to_quat = function(matrix) {
    return util.matrix_to_quat(matrix);
}

/**
 * <p>Convert euler rotation to quaternion rotation.
 *
 * <p>The euler angles have the following meaning (intrinsic system):
 * <ul>
 * <li>euler[0]: heading, y
 * <li>euler[1]: attitude, z
 * <li>euler[2]: bank, x
 * </ul>
 * <p>Using euler angles is discouraged, use quaternion instead.
 * @method module:util.euler_to_quat
 * @param {Float32Array} euler Euler vector
 * @param {Float32Array} quat Destination quaternion vector
 * @retunrns {Float32Array} Quaternion vector
 */
exports.euler_to_quat = function(euler, quat) {
    if (!quat)
        quat = new Float32Array(4);

    return util.euler_to_quat(euler, quat);
}

/**
 * <p>Convert quaternion rotation to euler rotation.
 *
 * <p>The euler angles have the following meaning (intrinsic system):
 * <ul>
 * <li>euler[0]: heading, y
 * <li>euler[1]: attitude, z
 * <li>euler[2]: bank, x
 * </ul>
 * <p>Using euler angles is discouraged, use quaternion instead.
 * @method module:util.quat_to_euler
 * @param {Float32Array} quat Quaternion vector
 * @param {Float32Array} euler Destination euler vector
 * @retunrns {Float32Array} Euler vector
 */
exports.quat_to_euler = function(quat, euler) {
    if (!euler)
        euler = new Float32Array(3);

    return util.quat_to_euler(quat, euler);
}

/**
 * Get sign of the number.
 * @method module:util.sign
 * @param {Number} value Input value
 * @returns {Number} -1,0,1 for negative, zero or positive number accordingly
 */
exports.sign = util.sign;

/**
 * Clamp the number.
 * @method module:util.clamp
 * @param {Number} value Input value
 * @param {Number} min Lower bound
 * @param {Number} max Upper bound
 * @returns {Number} Clamped value
 */
exports.clamp = util.clamp;

/**
 * Convert quaternion rotation to a directional vector.
 * @method module:util.quat_to_dir
 * @param {Float32Array} quat Rotation quaternion
 * @param {Float32Array} ident Identity vector
 * @param {Float32Array} [dest] Destination vector
 * @returns {Float32Array} Destination vector.
 */
exports.quat_to_dir = util.quat_to_dir;

/**
 * Project camera quaternion rotation on a horizontal plane.
 * @method module:util.ground_project_quat
 */
exports.ground_project_quat = function(quat, dest) {
    return util.quat_project(quat, util.AXIS_MY, util.AXIS_Y, util.AXIS_MZ, dest);
}

/**
 * Transform a camera quaternion to a mesh quaternion.
 * @method module:util.cam_quat_to_mesh_quat
 * @param {Float32Array} quat Camera quaternion.
 * @param {Float32Array} [dest] Destination quaternion.
 * @returns {Float32Array} Destination quaternion.
 */
exports.cam_quat_to_mesh_quat = function(cam_quat, dest) {
    return util.cam_quat_to_mesh_quat(cam_quat, dest);
}

/**
 * Perform quaternion projection.
 * @method module:util.quat_project
 * @param {Float32Array} quat Quaternion to project.
 * @param {Float32Array} quat_ident_dir Direction corresponding to the identity quaternion.
 * @param {Float32Array} plane Plane direction (normal).
 * @param {Float32Array} plane_ident_dir Direction corresponding to the
 * identity quaternion in a plane.
 * @param {Float32Array} [dest] Destination quaternion.
 * @returns {Float32Array} Destination quaternion.
 */
exports.quat_project = function(quat, quat_ident_dir,
        plane, plane_ident_dir, dest) {

    if (m_vec3.dot(plane, plane_ident_dir) != 0) {
        m_print.error("Wrong in-plane direction");
        return null;
    }

    return util.quat_project(quat, quat_ident_dir,
            plane, plane_ident_dir, dest);
}

exports.hash_code = util.hash_code;

/**
 * Perform exponential smoothing.
 * @method module:util.smooth
 * @param {Number} curr Current value.
 * @param {Number} last Last smoothed value.
 * @param {Number} delta Time delta.
 * @param {Number} pariod Mean lifetime for avaraging.
 * @returns {Number} Smoothed value
 */
exports.smooth = util.smooth;

/**
 * Perform exponential smoothing (vector form).
 * @method module:util.smooth_v
 * @param {Float32Array} curr Current value.
 * @param {Float32Array} last Last smoothed value.
 * @param {Float32Array} delta Time delta.
 * @param {Float32Array} pariod Mean lifetime for avaraging.
 * @param {Float32Array} [dest] Smoothed value
 * @returns {Float32Array} Smoothed value
 */
exports.smooth_v = util.smooth_v;

/**
 * Check if object is a vector.
 * @method module:util.is_vector
 * @param {Object} o Object
 * @param {Number} [dimension=0] Dimension, allow any if not specified
 * @returns {Boolean} Check result
 */
exports.is_vector = util.is_vector;

/**
 * Correct the camera quaternion rotation.
 * @method module:util.correct_cam_quat_up
 * @param {Float32Array} quat Quaternion to correct
 * @param {Boolean} up_only Disable upside-down camera view
 */
exports.correct_cam_quat_up = util.correct_cam_quat_up;

exports.quat_to_angle_axis = util.quat_to_angle_axis;

exports.random_from_array = util.random_from_array;

exports.xz_direction = util.xz_direction;

exports.line_plane_intersect = util.line_plane_intersect;

/**
 * Check if object is of type MESH
 * @method module:util.is_mesh
 * @param {Object} obj Object ID
 * @returns {Boolean} Check result
 */
exports.is_mesh = util.is_mesh;

/**
 * Check if object is of type ARMATURE
 * @method module:util.is_armature
 * @param {Object} obj Object ID
 * @returns {Boolean} Check result
 */
exports.is_armature = util.is_armature;

/**
 * Convert radian angle into range [0, 2PI]
 * @method module:util.angle_wrap_0_2pi
 * @param {Number} angle Angle in radians
 * @returns {Number} Converted angle
 */
exports.angle_wrap_0_2pi = util.angle_wrap_0_2pi;

/**
 * Convert radian angle into custom range [from, to]
 * @method module:util.angle_wrap_periodic
 * @param {Number} angle Angle in radians
 * @param {Number} from Value from in radians
 * @param {Number} to Value to in radians
 * @returns {Number} Converted angle
 */
exports.angle_wrap_periodic = util.angle_wrap_periodic;

exports.smooth_step = util.smooth_step;

}

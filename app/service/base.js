const Service = require('egg').Service;
class Base extends Service {
	/**
	 * show and return success
	 * @param markTag
	 * @param message
	 * @param data
	 * @param detail
	 */
	success({ markTag, message, data, detail }) {
		this.app.logger.info(`[${markTag}] ${message} detail=${JSON.stringify(detail)}`);
    return { success: true, message, data };
	}

	/**
	 * show and return error
	 * @param markTag
	 * @param message
	 * @param detail
	 * @param code
	 */
	error({ markTag, message, detail, code }) {
		this.app.logger.error(`[${markTag}] ${message} detail=${JSON.stringify(detail)}`);
    return { success: false, message, code };
	}
}

module.exports = Base;